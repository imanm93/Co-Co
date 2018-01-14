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
      newSet.delete(item.id);
      this.setState({
        selectedItems: newSet,
        selectedChips: [...newSet]
      }, function() {
        fields.remove(item);
      });
    }

    onSelectedItem(item) {
      const { fields } = this.props;
      if (item && !this.state.selectedItems.has(item.id)) {
        let newSet = this.state.selectedItems;
        newSet.add(item.id);
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
            <FilterBox
              className='form-search'
              items={this.props.items}
              placeholder={this.props.placholder}
              onSelectedItem={this.onSelectedItem.bind(this)}
            />
          </div>
          {
            this.state.selectedChips.length > 0 && this.state.selectedChips.map(item => {
              const chipItem = {
                id: item,
                name: this.props.items.filter(i => i.id === item)[0].name
              };
              return <Chip key={item}
                  item={chipItem}
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
