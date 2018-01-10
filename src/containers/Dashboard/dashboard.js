import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
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
      this.props.fetchTopics(this.props.token);
      this.props.fetchSkills(this.props.token);
      this.props.fetchStreams(this.props.token);
      this.props.fetchOppTypes(this.props.token);
      this.props.fetchEventTypes(this.props.token);
      this.props.fetchDisciplines(this.props.token);
      this.props.fetchFilteredItems(this.props.token, '5c0abae8-58d3-4b8a-9d83-d53665407b7f', this.props.dash.tab, this.props.dash.query, this.props.dash.filters, 1);
      this.setState({
        modalStep: 0
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dash !== this.props.dash) this.props.fetchFilteredItems(
      nextProps.token,
      '5c0abae8-58d3-4b8a-9d83-d53665407b7f',
      nextProps.dash.tab,
      nextProps.dash.query,
      nextProps.dash.filters,
      1
    );
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

  onSelectedView(tab) {
    this.props.setDashTab(tab);
  }

  onFollowTopic(topic) {
    console.log("Following Topic", topic);
  }

  getFilterControls(tab) {
    let filterControls = [];
    filterControls.push({ type: FilterTypes.TOPICS, filters: this.props.filters.topicTypes });
    switch(tab) {
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

  updateUserSkills(skill) {
    console.log(skill);
  }

  updateUserTopics(topic) {
    console.log(topic);
  }

  onNextModal() {
    this.setState({
      modalStep: 1
    });
  }

  onSaveUserUpdates() {
    console.log("TODO: call add topics and add skills api calls");
  }

  render() {
    // if (this.props.api.err.status === 401) this.redirectToSignIn();
    console.log(this.props);
    const skills = dictToArray(this.props.skills);
    const filterControls = this.getFilterControls(this.props.dash.tab);
    return(
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
            />
          </Grid.Row>
            <ModalContainer buttonName="Add new skills" buttonProps={{ circular: true, secondary: true, floated: "right" }}>
              { this.state.modalStep == 0 &&
                <div>
                  <SkillsForm
                    skills={this.props.skills.skills}
                    streams={this.props.skills.streams}
                    updateSelectedSkills={this.updateUserSkills.bind(this)}
                  />
                  <Button circular secondary onClick={this.onNextModal.bind(this)}>Save skills & Tell us what you like!</Button>
                </div>
              }
              { this.state.modalStep == 1 &&
                <div>
                  <FiltersForm
                    type={FilterTypes.TOPICS}
                    title={'Topics'}
                    types={this.props.filters.topicTypes}
                    updateSelection={this.updateUserTopics.bind(this)}
                    message={'Choose any topics from the list below to tell us what you like. Event suggestions are based on this.'}
                  />
                  <Button circular secondary onClick={this.onSaveUserUpdates.bind(this)}>Save & Update Profile</Button>
                </div>
              }
            </ModalContainer>
          </Grid>
      </PageContainer>
    );
  }

}

function mapStateToProps(state) {
  return {
    lastActivityTimestamp: state.account.lastActivityTimestamp,
    isLoadingDashItems: state.loaders.isLoadingDashItems,
    profilePhotoUrl: state.account.profilePhotoUrl,
    courses: state.setup.courses,
    userId: state.account.userId,
    skills: state.skills,
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
