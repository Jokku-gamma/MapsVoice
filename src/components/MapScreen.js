import React,{useState,useEffect} from "react";
import {View,StyleSheet} from "react-native";
import MapView,{Marker,Polyline} from "react-native-maps";
import * as Location from "expo-location";

const MapComponent = ({routeCoords,destination}) =>{
  const [userLocation,setUserLocation] =useState(null);

  useEffect (() =>{
    let locationSubscripton;
    (async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !=="granted")return;
      locationSubscripton=await Location.watchPositionAsync(
        {
          accuracy:Location.Accuracy.Highest;
          timeInterval:2000,
          distanceInterval:5,
        },
        (location) =>{
          setUserLocation(location.coords);
        }
      );
    })();
    return () =>{
      if (locationSubscripton){
        locationSubscripton.remove();
      }
    };
  },[]);
  return (
    <MapView
    style={StyleSheet.map}
    region={
      userLocation ?{
        latitude:userLocation.latitude,
        longitude:userLocation.longitude,
        latitudeDelta:0.01,
        longitudeDelta:0.01,
      }:{
        latitude:37.7749,
        longitude:-122.4194,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
      }
    }
    showsUserLocation={true}
    followsUserLocation={true}
    >
      {userLocation && <Marker coordinate={userLocation} title="Your Location" />}
      {destination && <Marker coordinate={destination} title="Destination"/>}
      {routeCoords.length >0 && (
        <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="blue"/>
      )}
    </MapView>
  );
};

const styles=StyleSheet.create({
  map:{flex:1},
});

export default MapComponent;