import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {
	return (
		<View style={styles.DropdownContainer}>

			<View style={styles.DropdownSearch}>
				<TextInput style={styles.DropdownText} placeholder='Search' />
				<Icon name="search" size={20} color="#BBB" style={styles.DropdownIcon} />
			</View>

			<View style={{width: '100%', marginVertical: '2%'}}></View>

			<View style={styles.DropdownItemsContainer}>
				<View style={styles.DropdownItemsFrame}>
					<DropdownItem name='Java' title={true}/>
					<DropdownItem name='Python' title={true}/>
					<DropdownItem name='C++' selected={true} />	
				</View>
			</View>

		</View>
	)
}

export function DropdownItem(props) {
	const iconColor = (props.selected)? 'green' : 'white'
	const containerStyle = (props.selected)? '#F8F8F8' : 'white'

	return (
		<View style={[styles.DropdownItemContainer, {backgroundColor: containerStyle}]}>
			<Text style={[styles.DropdownText]}>
				{props.name}
			</Text>
			<Icon name="check-circle" size={20} color={iconColor} style={styles.DropdownIcon} />
		</View>
	)
}

const styles = StyleSheet.create({
	DropdownContainer: {
		width: '100%',
		paddingTop: '8%',
		flex: 1
	},

	DropdownSearch: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: '4%',
		backgroundColor: 'white',
		elevation: 4
	},
	DropdownText: {
		width: '80%',
		marginLeft: '5%',
		fontSize: 16
	},
	DropdownIcon: {
		marginLeft: '3%'
	},

	DropdownItemsContainer: {
		width: '100%',
		height: 100,
		flexDirection: 'row'
	},

	DropdownItemsFrame: {
		width: '100%',
		backgroundColor: 'white'
	},

	DropdownItemContainer: {
		width: '100%',
		paddingVertical: '4%',
		flexDirection: 'row',
		backgroundColor: 'white'
	}
});
