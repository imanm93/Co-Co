import React, { Component } from 'react';
import FilterBox from '../FilterBox';
import Chip from '../Chip';

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

    resetState() {
      this.setState({
        selectedItems: new Set(),
        selectedChips: []
      });
    }

    render() {
      const { meta } = this.props;
      const hasError = meta.touched && meta.error !== undefined;
      return(
        <div className='coandco-input-field'>
          <div className='coandco-input-label'>{this.props.label}</div>
          <div className='coandco-input-search'>
            <FilterBox placeholder={this.props.placholder} items={this.props.items} onSelectedItem={this.onSelectedItem.bind(this)} />
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
