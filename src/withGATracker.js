import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import Utils from './utils';

const TRACKERURL = process.env.NODE_ENV === "production" ? 'UA-90402003-1' : 'UA-00000000-1';

GoogleAnalytics.initialize(TRACKERURL);

const withGATracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      this.turnOffGoogleAnalytics();
      const page = this.props.location.pathname;
      trackPage(page);
    }
    turnOffGoogleAnalytics(){
      const query = new URLSearchParams(this.props.location.search);
      const analytics = query.get('analytics');
      if(analytics === "off"){
        Utils.setAnalyticsCookie();
      }
    }
    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withGATracker;
