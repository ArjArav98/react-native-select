import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {
	return (
		<View style={styles.DropdownContainer}>

			<View style={styles.DropdownSearch}>
				<TextInput style={styles.DropdownSearchText} placeholder='Search' />
				<Icon name="search" size={25} color="#BBB" style={styles.DropdownSearchIcon} />
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	DropdownContainer: {
		backgroundColor: 'orange',
		width: '100%',
		paddingTop: '8%',
		flex: 1
	},

	DropdownSearch: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: '4%',
		backgroundColor: 'white'
	},
	DropdownSearchText: {
		width: '80%',
		marginLeft: '5%',
		fontSize: 16,
		backgroundColor: 'white'
	},
	DropdownSearchIcon: {
		marginLeft: '3%'
	}
});
