import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import * as types from '../../constants/items/itemTypes';

class ButtonNewPost extends Component {

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

  render() {
    return(
      <div>
          <Button onClick={() => this.toggle()}>Post</Button>
          {
            this.state.showPostOptions &&
              Object.keys(types).map(t => {
                return <Button key={t}>{t}</Button>
              })
          }
      </div>
    )
  }

}

export default ButtonNewPost;
