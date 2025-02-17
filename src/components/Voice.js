import Tts from "react-native-tts";
const speakDirections =(directions) =>{
  Tts.speak(directions);
}
export default speakDirections;