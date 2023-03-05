import { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {

    useEffect(() => {
        console.log(props)
        console.log(props.markerInfos)
    });
  const [state, setState] = useState({
    location: { lat: 43.664486, lng: -79.399689 },
    zoom: 10,
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const handleMarkerClick = (props, marker, e) => {
    setState({
      ...state,
      showInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props,
      zoom: 17,
    });
    console.log(state.zoom);
  };

  const handleInfoWindowClose = () => {
    setState({
      ...state,
      showInfoWindow: false,
      activeMarker: null,
      selectedPlace: {},
    });
  };

  const { location, zoom, showInfoWindow, activeMarker, selectedPlace } = state;

  return (
    <Map
      google={props.google}
      style={{ width: '100%', height: '100%' }}
      zoom={zoom}
      initialCenter={location}
    >
      <Marker
        position={location}
        onClick={handleMarkerClick}
        name={'Physical abuse'}
        zoom={zoom}
        icon={{
          url:
          "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-exclamation-mark-web-flaticons-flat-flat-icons-3.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={handleInfoWindowClose}
      >
        <div>
          <h3>{selectedPlace.name}</h3>
          <p>I got punched</p>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAko1zPNw7hrKjF0WBbVH8sMFg029g6tOc',
})(MapContainer);
