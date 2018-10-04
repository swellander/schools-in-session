//this component's structure is from https://www.npmjs.com/package/react-places-autocomplete

import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { TextField } from '@material-ui/core';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: props.initialAddress };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidUpdate(prevProps) {
    //if form is update and not create, prepopulate input with school's current address
    if (prevProps.initialAddress !== this.props.initialAddress) {
      this.setState({ address: this.props.initialAddress })
    }
  }

  handleChange(address) {
    this.setState({ address });
  };

  async handleSelect(address) {
    try {
      const [result] = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(result)
      const addressObj = {
        address: result.formatted_address,
        lat,
        lng
      }
      //update state in parent form component
      this.props.selectAddress(addressObj);
    } catch (ex) {
      console.log("something went wrong with geocoding")
      throw ex;
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                label: 'Address',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;