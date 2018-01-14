import React, { Component } from 'react';
import Filters from '../Filters';
import { Grid } from 'semantic-ui-react';
import Chip from '../Chip';

class FiltersForm extends Component {

  updateSelected(type, q) {
    let items = q.split(",");
    this.props.updateSelection(items);
  }

  render() {
    return(
      <Grid>
        <Grid.Row style={{ padding: '3em 3em 0.5em' }}>
          <div className='coandco-skills-form-header' style={{ width: '100%' }}>{this.props.title}</div>
          { this.props.message &&
            <div className='coandco-skills-form-description' style={{ width: '100%' }}>{this.props.message}</div>
          }
        </Grid.Row>
        <Grid.Row style={{ padding: '0.5em 3em' }}>
          <Grid.Column width={8}>
            <Filters type={this.props.type} filters={this.props.types} updateQuery={this.updateSelected.bind(this)} selectedFilters={this.props.selectedFilters} />
          </Grid.Column>
          <Grid.Column width={8}>
            {
              this.props.selectedFilters && this.props.selectedFilters.map(filterId => {
                return  <Chip key={"ChipFilter" + filterId} item={{ id: filterId, name: this.props.types[filterId] }} onRemove={this.onFilterRemove.bind(this)} />
              })
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default FiltersForm;
