/* global google */
import React, { useState, useEffect, Component } from "react";
import { Circle, Marker, GoogleApiWrapper, LoadScript, DirectionsStatus } from 'google-maps-react';
import DirectionsRenderer from 'google-maps-react';
import GoogleMap from 'google-maps-react';

function Mapa(props) {

    let location = props.coordinates;
    let locationDestino = sessionStorage.getItem("locationAlvo") === null ? location : sessionStorage.getItem("locationAlvo").split(',');

    let directions;

    const directionsService = new google.maps.DirectionsService();

    console.log('COORDS ORIGEM: ' + location)
    var myLatlng = new google.maps.LatLng(location[1],location[0]);

    var LatlngAlvo;
    console.log('COORDS DESTINO: ' + locationDestino)
    LatlngAlvo = new google.maps.LatLng(locationDestino[1],locationDestino[0]);

    console.log(myLatlng);
    console.log(LatlngAlvo);

    console.log('CALCULANDO ROTAS')
    directions = calculateAndDisplayRoute(directionsService).then();
    console.log('DDDDDDDDDDDD: ' + directions)

    async function calculateAndDisplayRoute(directionsService) {
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
                console.log(response)
                return response;
                
            } else {
                console.log("Directions request failed due to " + status);
            }
        });
    }

    sessionStorage.removeItem("locationAlvo");

    return (
        <div id="map_canvas">
            <GoogleMap 
                google={props.google} 
                zoom={11}
                center={{
                    lat: location[1],
                    lng: location[0]
                }}>
                <Marker 
                    position={{
                        lat: location[1], 
                        lng: location[0]
                    }}
                    name={'Minha localização'}
                />

                <Marker 
                    position={{
                        lat: locationDestino[1], 
                        lng: locationDestino[0]
                    }}
                    name={'Localização do cuidador'}
                />

                <Circle
                    radius={parseInt(props.distancia) * 1000}
                    center={{
                        lat: location[1], 
                        lng: location[0]
                    }}
                    onMouseover={() => console.log('mouseover')}
                    onClick={() => console.log('click')}
                    onMouseout={() => console.log('mouseout')}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.045}
                />
                
            </GoogleMap>
        </div>
        /*
            <DirectionsRenderer
                center={{
                    lat: props.coordinates[1],
                    lng: props.coordinates[0]
                }}
                directions={directions}
            />
        */
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBTiJt25rmCY2qjSzNaZ1t3XM34HrZJ-i0"
})(Mapa);