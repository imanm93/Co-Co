import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import Chip from './chip';

class SearchFormField extends Component {

    onRemove(skill) {
      this.props.selectedItems.remove(skill);
    }

    onSelectedItem(skill) {
      if (skill) this.props.selectedItems.add(skill);
    }

    render() {
      const { meta } = this.props;
      const hasError = meta.touched && meta.error !== undefined;
      const selectedChips = [...this.props.selectedItems];
      return(
        <div>
          <div>
            <SearchBox items={this.props.items} onSelectedItem={this.onSelectedItem.bind(this)} />
          </div>
          { selectedChips.length > 0 && selectedChips.map(item => {
                  console.log(item);
                  return <Chip item={item} onRemove={this.onRemove.bind(this)} />
            })
          }
          { hasError && <span style={{color:'#E74C3C'}}><i>{meta.error}</i></span> }
        </div>
      )
    }
}

export default SearchFormField;
