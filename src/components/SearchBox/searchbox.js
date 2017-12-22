import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { getSuggestionValue } from './searchutils';

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class SearchBox extends Component {

  componentWillMount() {
    this.setState({
      value: '',
      suggestions: []
    });
  }

  onKeyPress = (event) => {
    if (this.props.setSearchQuery && event.key === 'Enter') this.props.setSearchQuery(this.state.value);
  };

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
    this.setState({
      suggestions: []
    }, function() {
      if (this.props.setSearchQuery && this.state.value.length > 0) this.props.setSearchQuery(this.state.value);
      if (this.props.onSelectedItem) this.props.onSelectedItem(this.getSelectedObject(this.state.value));
    });
  };

  getSelectedObject = value => {
      return this.props.items.filter(item => item.name.toLowerCase() === value)[0];
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.props.items.filter(item =>
      item.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      placeholder: this.props.placeholder,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default SearchBox;
