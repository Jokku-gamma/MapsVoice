import React ,{useState} from "react";
import {View,TextInput,Button,StyleSheet} from "react-native";
import {API_KEY} from "../config";

const SearchBox = ({setRouteCoords,setDestination}) =>{
    const [destinationInput,setDestinationInput] =useState("");
    const fetchDirections=async () =>{
        try{
            const response=await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destinationInput)}&key=${API_KEY}`

            );
            const data=await response.json();
            if(data.results.length>0){
                const {lat,lng}=data.results[0].geometry.location;
                setDestination({latitude:lat,longitude:lng});

                setRouteCoords([
                    {latitude:lat,longitude:lng},
                ]);
            }
            else{
                alert("Location not Found.Try Again");
            }
        }
        catch(error){
            console.error("Error fetching directions",error);
        }
    };
    return(
        <View style={StyleSheet.container}>
            <TextInput
            style={styles.input}
            placeholder="Enter Destination"
            value={destinationInput}
            onChangeText={setDestinationInput}
            />
            <Button title="Go" onPress={fetchDirections} />
        </View>
    );

};

const styles=StyleSheet.create({
    container:{flexDirection:"row",padding:10},
    input:{flex:1,borderWidth:1,padding:8,marginRight:10},
});

export default SearchBox;