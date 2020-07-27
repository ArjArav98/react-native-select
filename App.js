import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {
	return <Dropdown />
}

function Dropdown(props) {

	const [selected, changeSelectedTo] = useState('none')

	const items = [
		{label: 'Java', value: 'Java'},
		{label: 'Python', value: 'Python'},
		{label: 'Scala', value: 'Scala'},
		{label: 'C++', value: 'C++'},
		{label: 'PHP', value: 'PHP'},
		{label: 'C', value: 'C'},
		{label: 'Clojure', value: 'Clojure'},
		{label: 'HTML', value: 'HTML'},
		{label: 'CSS', value: 'CSS'},
		{label: 'Javascript', value: 'Javascript'},
		{label: 'Typescript', value: 'Typescript'},
		{label: 'ClojureScript', value: 'ClojureScript'},
		{label: 'Lisp', value: 'Lisp'},
	]
	.sort((item1, item2) => item1.label.localeCompare(item2.label))

	const alphabetSearchVisible = (items.length > 10)? true : false

	const getItemsJSX = () => {
		return items.map((item) => {
			const key = item.value
			const isSelected = (selected === item.value)? true : false
			return (
				<DropdownItem 	name={item.label} selected={isSelected} key={key}
								onPress={() => changeSelectedTo(item.value)} />
			)
		})
	}

	return (
		<View style={styles.DropdownContainer}>

			<View style={styles.DropdownSearch}>
				<TextInput style={styles.DropdownText} placeholder='Search' />
				<Icon name="search" size={20} color="#BBB" style={styles.DropdownIcon} />
			</View>

			<View style={styles.DropdownTitleContainer}>
				<Text style={styles.DropdownTitleText}>
					Products
				</Text>
			</View>

			<View style={styles.DropdownItemsContainer}>
				<View style={styles.DropdownItemsFrame}>
					
					<ScrollView style={[styles.DropdownItemsList, 
										{width: (alphabetSearchVisible)? '95%' : '100%'}]}>
						{getItemsJSX()}
					</ScrollView>
					<DropdownAlphabetSearch visible={alphabetSearchVisible} />

				</View>
			</View>

		</View>
	)
}

function DropdownItem(props) {
	const iconColor = (props.selected)? 'green' : 'white'
	const containerStyle = (props.selected)? '#F8F8F8' : 'white'

	return (
		<TouchableOpacity style={{width: '100%'}} onPress={props.onPress}>
			<View style={[styles.DropdownItemContainer, {backgroundColor: containerStyle}]}>
				<Text style={[styles.DropdownText]}>
					{props.name}
				</Text>
				<Icon name="check-circle" size={20} color={iconColor} style={styles.DropdownIcon} />
			</View>
		</TouchableOpacity>
	)
}

function DropdownAlphabetSearch(props) {
	const display = (props.visible)? 'flex' : 'none'
	return (
		<View style={[styles.DropdownItemsAlphabetSearch, {display: display}]}>
			<Text style={styles.DropdownItemsAlphabetSearchText}>A</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>B</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>C</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>D</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>E</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>F</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>G</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>H</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>I</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>J</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>K</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>L</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>M</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>N</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>O</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>P</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>Q</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>R</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>S</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>T</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>U</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>V</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>W</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>X</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>Y</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText}>Z</Text>
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

	DropdownTitleContainer: {
		width: '100%',
		marginTop: '6%',
		marginBottom: '3%'
	},
	DropdownTitleText: {
		width: '90%',
		marginHorizontal: '5%',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},

	DropdownItemsContainer: {
		width: '100%',
		height: 100,
		flexDirection: 'row'
	},
	DropdownItemsFrame: {
		width: '100%',
		flexDirection: 'row',
		flex: 1
	},
	DropdownItemsList: {
		width: '95%',
		height: 500
	},
	DropdownItemsAlphabetSearch: {
		width: '5%'
	},
	DropdownItemsAlphabetSearchText: {
		width: '100%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 10,
		color: '#787878',
		marginVertical: '10%'
	},	

	DropdownItemContainer: {
		width: '100%',
		paddingVertical: '4%',
		flexDirection: 'row'
	}
});
