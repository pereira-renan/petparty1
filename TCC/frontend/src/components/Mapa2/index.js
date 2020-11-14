/* global google */
import React , { useState } from 'react'
import { GoogleMap, LoadScript, Marker, Circle, DirectionsRenderer } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100%',
  height: '100%'
};
var myLatlng;
var LatlngAlvo;
 
function Mapa2(props) {
    let directions;
    let location = props.coordinates;
    let locationDestino = sessionStorage.getItem("locationAlvo") === null ? location : sessionStorage.getItem("locationAlvo").split(',');

    const center = {
        lat: parseFloat(location[1]),
        lng: parseFloat(location[0])
    };

    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
        directionsRenderer.setMap(map);

        myLatlng = new google.maps.LatLng(location[1],location[0]);
        LatlngAlvo = new google.maps.LatLng(locationDestino[1],locationDestino[0]);
        console.log(myLatlng)
        console.log(LatlngAlvo)

        directions = calculateAndDisplayRoute(directionsService, directionsRenderer);
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService.route({
            origin: myLatlng,
            destination: LatlngAlvo,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            waypoints: [
                {
                    location: myLatlng
                },
                {
                    location: LatlngAlvo
                }
            ]
        }, (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                
            } else {
                console.log("Directions request failed due to " + status);
            }
        });
    }

    sessionStorage.removeItem("locationAlvo");
    return (
        <div id="map_canvas">
            <LoadScript
            googleMapsApiKey="AIzaSyBTiJt25rmCY2qjSzNaZ1t3XM34HrZJ-i0"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    defaultZoom = { 16 }
                    
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >

                    <Circle
                        radius={parseInt(props.distancia) * 1000}
                        center={{
                            lat: center.lat, 
                            lng: center.lng
                        }}
                        options={{
                            strokeColor: 'transparent',
                            strokeOpacity: 0,
                            strokeWeight: 5,
                            fillColor: '#FFC0CB',
                            fillOpacity: 0.3
                        }}
                    />

                    <DirectionsRenderer
                        center={{
                            lat: props.coordinates[1],
                            lng: props.coordinates[0]
                        }}
                        directions={directions}
                    />

                        
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
 
export default React.memo(Mapa2)