import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class OppItem extends Component {

  render() {
    return (
      <div>
          { this.props.item.companyDetails.contactEmail &&
              <div><b>External</b></div>
          }
          <div><b>Opportunity</b></div>
          <div><span>{this.props.item.opportunityType}</span>  <span>#{this.props.item.topic}</span></div>
          <div>{this.props.item.title}</div>
          { this.props.item.description &&
            <div>{this.props.item.description}</div>
          }
          <div>{this.props.item.user.name}</div>
          <div>{this.props.item.displayTime}</div>
          <Button onClick={() => this.props.onExpand(this.props.item.type, this.props.item.itemId)}>See More</Button>
      </div>
    )
  }

}

export default OppItem;
