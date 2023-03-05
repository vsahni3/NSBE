import { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ markerInfos, google }) => {
  const [markers, setMarkers] = useState([]);
  console.log(markerInfos);

  useEffect(() => {
    for (let i = 0; i < markers.length; i++) {
      // console.log(markers.length);
      // console.log(markers[i]);
      // console.log(markerInfos);
    }
    // console.log(markerInfos);
  }, []);

  useEffect(() => {
    setMarkers(
      markerInfos.map((markerInfo) => (
        <Marker
          key={markerInfo[0]}
          location={{lat: markerInfo[1], lng: markerInfo[2]}}
          name={"haha"}
          // title={markerInfo[3]}
          // zoom={zoom}
          // icon={{
          // url:
          //   "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-exclamation-mark-web-flaticons-flat-flat-icons-3.png",
          // scaledSize: new window.google.maps.Size(40, 40),
        // }}

        />
      ))
    );
  }, [markerInfos]);

    // const location2 = { 'lat': markers[0][1], 'lng': markers[0][2] }

  // <Marker
  //       position={location}
  //       onClick={handleMarkerClick}
  //       name={name}
  //       zoom={zoom}
  //       // icon={{
  //       //   url:
  //       //     "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-exclamation-mark-web-flaticons-flat-flat-icons-3.png",
  //       //   scaledSize: new window.google.maps.Size(40, 40),
  //       // }}
  //     />

  useEffect(() => {
    console.log(markers[0])
    // console.log(markers[0][0])
  }, [markers])


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
    // console.log(markers);
    // setMarkers('');
    // console.log(markers);
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

  // const location2 = { 'lat': markers[0][1], 'lng': markers[0][2] }
  // console.log(location2);
  // const location
  // const name = markers[0][3];
  const name = 'asdasda'


  return (
    // location: { lat: 43.664486, lng: -79.399689 },
    // zoom: 10,
    // showInfoWindow: false,
    // activeMarker: {},
    // selectedPlace: {},
    <Map
      google={google}
      style={{ width: '100%', height: '100%' }}
      zoom={zoom}
      initialCenter={location}
    >
      <Marker
        position={{ lat: 43.664486, lng: -79.399689 }}
        // onClick={handleMarkerClick}
        name={name}
        // zoom={zoom}
        // icon={{
        //   url:
        //     "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-exclamation-mark-web-flaticons-flat-flat-icons-3.png",
        //   scaledSize: new window.google.maps.Size(40, 40),
        // }}
      />
      
      {markers.map((marker) => (
        <Marker key={0} position={{ lat: marker[1], lng: marker[2] }} />
      ))}

      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={handleInfoWindowClose}
      >
        <div>
          <h3>{selectedPlace.name}</h3>
          {/* <p>I got punched</p> */}
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAko1zPNw7hrKjF0WBbVH8sMFg029g6tOc',
})(MapContainer);