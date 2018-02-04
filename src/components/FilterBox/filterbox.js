import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = (suggestion) => {
  return <div>
    {suggestion.name}
  </div>
}

class FilterBox extends Component {

  componentWillMount() {
    this.setState({
      value: '',
      suggestions: this.props.items
    });
  }

  onKeyPress = (event) => {
    if (this.props.setSearchQuery && event.key === 'Enter') {
      this.props.setSearchQuery(this.state.value);
    }
  };

  onClick = (event) => {
    console.log(event);
    this.shouldRenderSuggestions();
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    let suggestions = this.getSuggestions(this.state.value);
    if (suggestions.length > 0) {
      this.setState({
        suggestions: []
      }, function() {
        if (this.props.setSearchQuery && this.state.value.length > 0) this.props.setSearchQuery(this.state.value);
        if (this.props.onSelectedItem && this.state.value.length > 0) {
          this.props.onSelectedItem(this.getSelectedObject(this.state.value));
        }
        if (!this.props.single) this.setState({
          value: ''
        });
      });
    }
    else if(this.state.value && this.state.value.length > 0){
      if(this.props.onNoMatchFound) this.props.onNoMatchFound();
    }
  };

  getSelectedObject = value => {
    const selectedValue = value.trim().toLowerCase();
    return this.props.items.filter(item => item.name.toLowerCase() === selectedValue)[0];
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? this.props.items : this.props.items.filter(item =>
      item.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }
  getSuggestionValue = suggestion => suggestion.name;

  shouldRenderSuggestions = () => true;

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      placeholder: this.props.placeholder,
      onKeyPress: this.onKeyPress,
      onChange: this.onChange,
      onClick: this.onClick
    };
    return (
      <div className={this.props.className}>
        <Autosuggest
          inputProps={inputProps}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          renderSuggestion={renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          shouldRenderSuggestions ={this.shouldRenderSuggestions}
        />
      </div>
    );
  }
}

export default FilterBox;
