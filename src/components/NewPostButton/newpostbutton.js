import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './newpostbutton.css';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions/postButtonActions';
import * as ItemTypes from '../../constants/items/itemTypes';

class NewPostButton extends Component {

  componentWillMount() {
    this.setState({
      showPostOptions: false
    })
  }

  onToggle() {
    this.setState({
      showPostOptions: !this.state.showPostOptions
    });
  }

  onRedirectToPostForm(type) {
    this.setState({
      showPostOptions: false
    }, function() {
      this.props.setPostFormTab(type);
      this.props.history.push('/post');
    });
  }

  render() {
    return(
      <div>
          <div>
            {
              !this.state.showPostOptions &&
                <Button className="coandco-new-post-btn-main" onClick={() => this.onToggle()}><i className="fa fa-plus" aria-hidden="true"></i>Post</Button>
            }
            {
              this.state.showPostOptions &&
                <Button className="coandco-new-post-btn-inverted" onClick={() => this.onToggle()}><i className="fa fa-times" aria-hidden="true"></i>Post</Button>
            }
          </div>
          <div style={{ position: 'absolute', zIndex: '1001' }}>
            {
              this.state.showPostOptions &&
                Object.keys(ItemTypes).map(t => {
                  return <Button key={t} className="coandco-new-post-btn" onClick={() => this.onRedirectToPostForm(ItemTypes[t])}>{ItemTypes[t]}</Button>
                })
            }
          </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(NewPostButton);
