import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions/postButtonActions';
import * as ItemTypes from '../../constants/items/itemTypes';

class NewPostButton extends Component {

  componentWillMount() {
    this.setState({
      showPostOptions: false
    })
  }

  toggle() {
    this.setState({
      showPostOptions: !this.state.showPostOptions
    });
  }

  onCreatePost(type) {
    this.setState({
      showPostOptions: false
    });
  }

  onRedirectToPostForm(type) {
    this.props.setPostFormTab(type);
    this.props.history.push('/post');
  }

  render() {
    return(
      <div>
          {
            !this.state.showPostOptions &&
              <Button className="coandco-btn" onClick={() => this.toggle()}><i className="fa fa-plus" aria-hidden="true"></i>Post</Button>
          }
          {
            this.state.showPostOptions &&
              <Button className="coandco-btn-inverted" onClick={() => this.toggle()}><i className="fa fa-times" aria-hidden="true"></i>Post</Button>
          }
          {
            this.state.showPostOptions &&
              Object.keys(ItemTypes).map(t => {
                return <Button key={t} className="coandco-btn" onClick={() => this.onRedirectToPostForm(ItemTypes[t])}>{ItemTypes[t]}</Button>
              })
          }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(NewPostButton);
