import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dictToArray } from '../../utils/dictTransforms';
import styles from './dashboard.css';

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
      this.redirectToSetup();
    }

    this.props.fetchTopics(this.props.token);
    this.props.fetchSkills(this.props.token);
    this.props.fetchStreams(this.props.token);
    this.props.fetchOppTypes(this.props.token);
    this.props.fetchEventTypes(this.props.token);
    this.props.fetchMyProfile(this.props.token, this.props.userId);
    this.props.fetchFilteredItems(this.props.token, this.props.userId, this.props.dash.tab, this.props.dash.query, this.props.dash.filters, 1);

    const timeStamp = Math.floor(Date.now());
    if (this.props.lastActivityTimestamp < timeStamp) {
      this.setState({
        modalStep: 0,
        modalOpen: false,
        skills: new Set()
      });
    }
    else
    {
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
          1
        );
      }
      else {
        this.props.fetchConnections(nextProps.token);
      }
    }
  }

  redirectToSetup() {
    this.props.history.push('/setup');
  }

  redirectToSignIn() {
    this.props.history.push('/signin');
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
      });
    });
  }

  onStartProcess() {
    this.setState({
      modalStep: 1
    });
  }

  onSaveSkills() {
    this.props.setUserSkills(this.props.token, [...this.state.newSkills], (success) => {
      if (success) this.setState({
        modalStep: 2
      });
    });
  }

  render() {
    const skills = dictToArray(this.props.skills);
    const filterControls = this.getFilterControls(this.props.dash.tab);
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
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
              name={this.props.name}
              token={this.props.token}
              filters={filterControls}
              userId={this.props.userId}
              items={this.props.items.items}
              currentTab={this.props.dash.tab}
              isLoading={this.props.isLoadingDashItems}
              profilePhotoUrl={this.props.profilePhotoUrl}
              setFilterQuery={this.updateItemsAndFilterQuery.bind(this)}
              onMyConnections={this.onMyConnections.bind(this)}
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
                    We hope you had a great holiday.<br/><br/>
                    We sure did and want to update you on all the latest changes. We are now using a new taargeting mechanism
                    designed to show you things that will interest you most.<br/><br/>
                    But for us to do this really well, we need your help!
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16} style={{ padding: '0em 2em 2em', textAlign: 'center' }}>
                    <Button circular secondary onClick={this.onStartProcess.bind(this)}>Please tell us about your latest skills and interests!</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
            { this.state.modalStep == 1 &&
              <div>
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
            {this.state.modalStep == 2 &&
              <div>
                <FiltersForm
                  type={FilterTypes.TOPICS}
                  title={'Topics'}
                  selectedTopics={this.props.userTopics}
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
        </Grid>
      </PageContainer>
    );
  }

}

function mapStateToProps(state) {
  return {
    lastActivityTimestamp: state.account.lastActivityTimestamp,
    isLoadingDashItems: state.loaders.isLoadingDashItems,
    profileComplete: state.account.profileComplete,
    profilePhotoUrl: state.account.profilePhotoUrl,
    courses: state.setup.courses,
    userId: state.account.userId,
    token: state.account.token,
    name: state.account.name,
    filters: state.filters,
    skills: state.skills.skills,
    streams: state.skills.streams,
    search: state.search,
    items: state.items,
    dash: state.dash,
    api: state.api
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
