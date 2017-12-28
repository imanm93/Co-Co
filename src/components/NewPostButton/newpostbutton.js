import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
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
    this.props.history.push('/post/' + type);
  }

  render() {
    return(
      <div>
          <Button onClick={() => this.toggle()}>Post</Button>
          {
            this.state.showPostOptions &&
              Object.keys(ItemTypes).map(t => {
                return <Button key={t} onClick={() => this.onRedirectToPostForm(ItemTypes[t])}>{ItemTypes[t]}</Button>
              })
          }
      </div>
    )
  }

}

export default NewPostButton;
