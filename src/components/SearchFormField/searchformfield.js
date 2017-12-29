import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import Chip from './chip';

class SearchFormField extends Component {

    componentWillMount() {
      this.setState({
        selectedItems: new Set(),
        selectedChips: []
      });
    }

    onRemove(item) {
      const { fields } = this.props;
      let newSet = this.state.selectedItems;
      newSet.delete(item);
      this.setState({
        selectedItems: newSet,
        selectedChips: [...newSet]
      }, function() {
        fields.remove(item);
      });
    }

    onSelectedItem(item) {
      const { fields } = this.props;
      if (item && !this.state.selectedItems.has(item)) {
        let newSet = this.state.selectedItems;
        newSet.add(item);
        this.setState({
          selectedItems: newSet,
          selectedChips: [...newSet]
        }, function() {
          fields.push(item);
        });
      }
    }

    render() {
      const { meta } = this.props;
      const hasError = meta.touched && meta.error !== undefined;
      return(
        <div>
          <div>
            <SearchBox items={this.props.items} onSelectedItem={this.onSelectedItem.bind(this)} />
          </div>
          {
            this.state.selectedChips.length > 0 && this.state.selectedChips.map(item => {
              return <Chip
                key={item.id}
                item={item}
                onRemove={this.onRemove.bind(this)}
              />
            })
          }
          { hasError && <span style={{color:'#E74C3C'}}><i>{meta.error}</i></span> }
        </div>
      )
    }

}

export default SearchFormField;
