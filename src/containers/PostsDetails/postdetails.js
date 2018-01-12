import React from 'react';
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import CoreLayout from '../CoreLayout';
import { Link, withRouter } from 'react-router-dom';
import Spinner from "../../components/Common/spinner";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer/Dimmer";
import Loader from "semantic-ui-react/dist/es/elements/Loader/Loader";
import { Button, Container, Divider, Grid, Header, Icon, Image, Item, Message, Modal } from "semantic-ui-react";
import OppCard from "../../components/OppCard";
import PostCard from "../../components/PostCard";
import styles from './postdetails.css';
import EventItem from "../../components/EventItem/EventItem";
import PostDetail from '../PostDetail/postdetail';

class PostDetails extends React.Component {

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    if (this.props.match.params.userId && this.props.match.params.itemIds) {
      let itemsIds = this.props.match.params.itemIds.split("&");
      this.props.getDashboardItemsById(this.props.match.params.userId, itemsIds);
    }
  };

  render() { 
    let items = this.props.dashboardItems.map((item,i)=>{
      return <PostDetail item={item} key={'postDetail'+i}/>;
    })
    return ( 
      <div works ></div>
    )
  };
}

function mapStateProps(state) {
  return {
    userInfo: state.auth,
    dashboardItems: state.notificationReducer.notificationsDetails
  }
}

export default connect(mapStateProps, actions)(PostDetails);
