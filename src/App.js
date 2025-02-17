import React,{useState} from "react";
import {View,StyleSheet} from "react-native";
import MapComponent from "./components/MapScreen";
import SearchBox from "./components/Search";
import speakDirections from "./components/voice";

const App =() =>{
    const [routeCoords,setRouteCoords]=useState([]);
    const [destination,setDestination]=useState(null);

    return(
        <View style={StyleSheet.container}>
            <SearchBox setRouteCoords={setRouteCoords} setDestination={setDestination} />
            <MapComponent routeCoords={routeCoords} destination={destination}/>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{flex:1},
});

export default App;