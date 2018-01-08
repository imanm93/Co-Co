import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class PageContainer extends Component {

  render() {
    return(
      <Container>
        {this.props.children}
      </Container>
    )
  }

}

export default PageContainer;
