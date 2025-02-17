import {GOOGLE_MAPS_API_KEY} from "./config";
export const getDirections=async(originalXMLHttpRequest,destination) =>{
    const url=`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
    let response=await fetch(url);
    let data=await response.json();
    return data.routes[0]?.legs[0]?.steps || [];
};