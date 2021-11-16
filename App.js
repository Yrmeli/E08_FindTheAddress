
// Import
import React, { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Alert, TextInput} from'react-native';
import MapView, { Marker} from 'react-native-maps';

export default function App() {

const [osoite, setOsoite] = useState('');
const [region, setRegion] = useState({
	latitude: 60.166628,
	longitude: 24.943508,
	latitudeDelta: 0.09,
	longitudeDelta: 0.09,
	marker:false
});

const getRegion= () => {
	
		fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=%204G05Ni1C3G5EqHrP0vGOYvVQR5baT6K7&location=${osoite}`)
		.then(response => response.json())
		.then(responseJson => setRegion( {
			...region,
			latitude: responseJson.results[0].locations[0].displayLatLng.lat,
			longitude: responseJson.results[0].locations[0].displayLatLng.lng,
			latitudeDelta: 0.02,
			longitudeDelta: 0.02,
			marker:true
		}))
		.catch(error => { 
			Alert.alert('Error', error); 
		});    
}

return (
        <View style={styles.container}>

				<MapView
				style = {{flex:8, width:'100%'}}
				region = {region}>
						{
							region.marker &&
							<Marker
							coordinate = {{
							latitude:region.latitude,
							longitude:region.longitude}}
							/>
						}
				</MapView>

				<TextInput 
				style = {styles.input}
				onChangeText = {osoite => setOsoite(osoite)} 
				value = {osoite}
				/>
				<Button title = "Show" onPress = { getRegion }/>		
				<StatusBar hidden = {true} />
			</View>
            
);
}

// Tyyli
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
		input:{
		width:'100%',
		padding:5,
		margin:5,
		borderColor:'gray', 
		borderWidth:1
		},
	});