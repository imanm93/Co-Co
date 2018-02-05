import React, { Component } from 'react';
import styles from './dashboard.css';
import { connect } from 'react-redux';
import { dictToArray } from '../../utils/dictTransforms';
import { Grid, Button, Modal, Dimmer, Loader } from 'semantic-ui-react';

import * as FilterTypes from '../../constants/filters/filterTypes';
import * as DashboardTabs from '../../constants/dashboard/dashboardTypes';
import * as actions from '../../actions';

import NavBar from '../NavBar';
import SkillsForm from '../../components/SkillsForm';
import FiltersForm from '../../components/FiltersForm';
import PageContainer from '../../components/PageContainer';
import DashboardResults from './components/dashboardresults';
import ModalContainer from '../../components/ModalContainer';
import DashboardSearchBar from './components/dashboardsearchbar';
import DashboardItemsSelectorBar from './components/dashboarditemsselectorbar';

class Dashboard extends Component {

  componentWillMount() {

    if (!this.props.token) {
      this.redirectToSignIn();
    }
    else if (!this.props.profileComplete) {
      // this.redirectToSetup();
    }

    this.props.fetchTopics(this.props.token);
    this.props.fetchSkills(this.props.token);
    this.props.fetchStreams(this.props.token);
    this.props.fetchOppTypes(this.props.token);
    this.props.fetchEventTypes(this.props.token);
    this.props.fetchMyProfile(this.props.token, this.props.userId);
    this.props.fetchFilteredItems(this.props.token, this.props.userId, this.props.dash.tab, this.props.dash.query, this.props.dash.filters, 1);

    const timeStamp = new Date('Mon Jan 15 2018 06:30:00 GMT+0000').getTime();
    if (this.props.lastActivityTimestamp === 0) {
      this.setState({
        modalToEditProfile: true
      });
    }
    else if (this.props.lastActivityTimestamp < timeStamp) {
      this.setState({
        modalStep: 0,
        modalOpen: true,
        skills: new Set()
      });
    }
    else {
      this.setState({
        modalStep: 0,
        modalOpen: false,
        skills: new Set()
      });
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dash !== this.props.dash) {
      if (!nextProps.dash.filters.myConnections) {
        this.props.fetchFilteredItems(
          nextProps.token,
          this.props.userId,
          nextProps.dash.tab,
          nextProps.dash.query,
          nextProps.dash.filters,
          nextProps.dash.page
        );
      }
      else {
        this.props.fetchConnections(nextProps.token);
      }
    }
  }

  redirectToEdit() {
    const timestamp = new Date().getTime();
    this.props.setLastActivityTimestamp(timestamp);
    this.props.setProfileViewId(this.props.token, this.props.userId, this.props.history);
  }

  redirectToSignIn() {
    this.props.history.push('/signin');
  }

  closeToEditProfile() {
    const timestamp = new Date().getTime();
    this.props.setLastActivityTimestamp(timestamp);
    this.setState({
      modalToEditProfile: false
    });
  }

  updateItemsAndFilterQuery(key, newVal) {
    this.props.setDashFilter({ [key]: newVal });
  }

  updateItemsAndSearchQuery(query) {
    this.props.setDashQuery(query);
  }

  onMyConnections(e, value) {
    this.props.setDashFilter({ 'myConnections': value.checked });
  }

  onSelectedView(tab) {
    this.props.setDashTab(tab);
  }

  updateUserSkills(skills) {
    this.setState({
      newSkills: skills
    });
  }

  updateUserTopics(topics) {
    this.setState({
      newTopics: topics
    });
  }

  onSaveTopics() {
    this.props.setUserTopics(this.props.token, this.state.newTopics, (success) => {
      if (success) this.setState({
        modalOpen: false
      }, function () {
        const timestamp = new Date().getTime();
        this.props.setLastActivityTimestamp(timestamp);
      });
    });
  }

  onLoadNextPage() {
    this.props.setNextPage(this.props.items.page + 1);
  }

  onStartProcess() {
    this.setState({
      modalStep: 1
    });
  }

  onSaveSkills() {
    let skillsSelectedFromForm = [];
    if (this.state.newSkills) skillsSelectedFromForm = [...this.state.newSkills];
    this.props.setUserSkills(this.props.token, skillsSelectedFromForm, (success) => {
      if (success) this.setState({
        modalStep: 2
      });
    });
  }

  onFollowTopic(topic) {
    console.log("Following Topic", topic);
  }

  getFilterControls(tab) {
    let filterControls = [];
    filterControls.push({ type: FilterTypes.TOPICS, filters: this.props.filters.topicTypes });
    switch (tab) {
      case DashboardTabs.OPPORTUNITIES:
        filterControls.push({ type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes });
        break;
      case DashboardTabs.EVENTS:
        filterControls.push({ type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes });
        break;
      case DashboardTabs.STATUS:
        break;
      case DashboardTabs.PEOPLE:
        break;
      default:
        filterControls.push({ type: FilterTypes.OPP_TYPES, filters: this.props.filters.oppTypes });
        filterControls.push({ type: FilterTypes.EVENT_TYPES, filters: this.props.filters.eventTypes });
        break;
    }
    return filterControls;
  }

  render() {
    const skills = dictToArray(this.props.skills);
    const filterControls = this.getFilterControls(this.props.dash.tab);
    const newItems = Object.assign({}, this.props.items.items);
    const items = [];
    let newItemsRequested = {};
    if (this.props.dash.tab === 'People') {
      if (this.props.connectionRequests.length > 0) {
        this.props.connectionRequests.map(cr => {
          if (newItems[cr.userId]) {
            let newItemRequest = Object.assign({}, newItems[cr.userId]);
            let newItemRequestUser = Object.assign({}, newItemRequest['user']);
            const newItemRequested = Object.assign({}, newItemRequest, { 'user': newItemRequestUser });
            newItemsRequested = Object.assign({}, newItems, { [cr.userId]: newItemRequested });
          }
          else
          {
            newItemsRequested = Object.assign({}, newItems);
          }
        });
      }
      else {
        newItemsRequested = Object.assign({}, newItems);
      }
      for (let key in newItemsRequested) {
        let value = newItemsRequested[key];
        value.id = key;
        items[items.length] = value;
      }
    }
    else
    {
      for (let key in this.props.items.items) {
        let value = this.props.items.items[key];
        value.id = key;
        items[items.length] = value;
      }
    }
    items.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar
            history={this.props.history}
            profilePhotoUrl={this.props.profilePhotoUrl}
          />
          <DashboardSearchBar
            items={skills}
            onFollowTopic={this.onFollowTopic.bind(this)}
            setSearchQuery={this.updateItemsAndSearchQuery.bind(this)}
          />
          <Grid.Row centered style={{ padding: 0 }}>
            <DashboardItemsSelectorBar
              tabs={DashboardTabs}
              currentTab={this.props.dash.tab}
              onSelected={this.onSelectedView.bind(this)}
            />
          </Grid.Row>
          <Grid.Row centered>
            <DashboardResults
              items={items}
              name={this.props.name}
              token={this.props.token}
              filters={filterControls}
              userId={this.props.userId}
              history={this.props.history}
              currentTab={this.props.dash.tab}
              isLoading={this.props.isLoadingDashItems}
              profilePhotoUrl={this.props.profilePhotoUrl}
              isMyConnections={this.props.isMyConnections}
              onLoadMoreItems={this.onLoadNextPage.bind(this)}
              onMyConnections={this.onMyConnections.bind(this)}
              canLoadMoreItems={this.props.items.canLoadMoreItems}
              isLoadingMoreItems={this.props.isLoadingMoreDashItems}
              setFilterQuery={this.updateItemsAndFilterQuery.bind(this)}
            />
          </Grid.Row>
          <Modal open={this.state.modalOpen}>
            { this.state.modalStep == 0 &&
              <Grid style={{ margin: 0 }}>
                <Grid.Row>
                  <Grid.Column width={16} style={{ padding: '2em 3em 0.5em', fontSize: '25px', fontWeight: 600 }}>
                    Welcome back {this.props.name.split(' ')[0]}!
                  </Grid.Column>
                  <Grid.Column width={16} style={{ padding: '0.5em 3.5em', fontSize: '22px' }}>
                    We hope you had a great holiday.<br /><br />
                    We sure did and want to update you on all the latest changes. We are now using a new targeting mechanism
                    designed to show you things that will interest you most.<br /><br />
                    But for us to do this even better, we need your help!
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16} style={{ padding: '0em 2em 2em', textAlign: 'center' }}>
                    <Button circular secondary onClick={this.onStartProcess.bind(this)}>Please tell us about your latest skills and interests!</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
            { this.state.modalStep == 1 && this.props.userSkills && this.props.skills &&
              <div>
                {this.props.isSavingSkills &&
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                }
                <SkillsForm
                  skills={this.props.skills}
                  streams={this.props.streams}
                  selectedSkills={this.props.userSkills}
                  updateSelectedSkills={this.updateUserSkills.bind(this)}
                />
                <Grid.Column width={16} style={{ textAlign: 'right', padding: '0em 3em 2em' }}>
                  <Button circular secondary onClick={this.onSaveSkills.bind(this)}>Save skills & Tell us what you like!</Button>
                </Grid.Column>
              </div>
            }
            {this.state.modalStep == 2 && this.props.userTopics && this.props.filters &&
              <div>
                {this.props.isSavingTopics &&
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                }
                <FiltersForm
                  type={FilterTypes.TOPICS}
                  title={'Topics'}
                  selectedFilters={this.props.userTopics}
                  types={this.props.filters.topicTypes}
                  updateSelection={this.updateUserTopics.bind(this)}
                  message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
                />
                <Grid.Column width={16} style={{ textAlign: 'right', padding: '0em 3em 2em' }}>
                  <Button circular secondary onClick={this.onSaveTopics.bind(this)}>Save & Update Profile</Button>
                </Grid.Column>
              </div>
            }
          </Modal>
          <Modal open={this.state.modalToEditProfile}>
            <Grid style={{ margin: 0 }}>
              <Grid.Row>
                <Grid.Column width={16} style={{ padding: '2em 3em 0.5em', fontSize: '25px', fontWeight: 600 }}>
                  Welcome to Co & Co, {this.props.name.split(' ')[0]}!
                </Grid.Column>
                <Grid.Column width={16} style={{ padding: '0.5em 3.5em', fontSize: '22px' }}>
                  Thank you for joining our community. Please help us better tailor our opportunities for you by filling out your profile!
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16} style={{ padding: '0em 2em 2em', textAlign: 'center' }}>
                  <Button circular
                    style={{
                      backgroundColor: 'white',
                      color: '#2A2A2A',
                      border: '1px solid #2A2A2A'
                    }}
                    onClick={this.closeToEditProfile.bind(this)}>
                      Close
                  </Button>
                  <Button circular secondary onClick={this.redirectToEdit.bind(this)}>Edit Profile</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal>
        </Grid>
      </PageContainer>
    );
  }

}

function mapStateToProps(state) {
  return {
    lastActivityTimestamp: state.account.lastActivityTimestamp,
    isLoadingMoreDashItems: state.loaders.isLoadingMoreDashItems,
    isLoadingDashItems: state.loaders.isLoadingDashItems,
    userSkills: state.profiles.profileEditData.skills,
    userTopics: state.profiles.profileEditData.topics,
    profileComplete: state.account.profileComplete,
    isMyConnections: state.loaders.isMyConnections,
    connectionRequests: state.connections.requests,
    profilePhotoUrl: state.account.profilePhotoUrl,
    isSavingSkills: state.loaders.isSavingSkills,
    isSavingTopics: state.loaders.isSavingTopics,
    streams: state.skills.streams,
    courses: state.setup.courses,
    userId: state.account.userId,
    skills: state.skills.skills,
    token: state.account.token,
    name: state.account.name,
    filters: state.filters,
    search: state.search,
    items: state.items,
    dash: state.dash,
    api: state.api
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
