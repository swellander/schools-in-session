import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Room from '@material-ui/icons/Room';

class Map extends Component {
  constructor() {
    super();
    this.defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
  }
  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: this.props.center,
      map,
    });
  }
  render() {
    const { lat, lng } = this.props.center;
    console.log(lat, lng)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDuFl6Og32tz_XPmQ68bPOb4rUebpJ3Jvs' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;