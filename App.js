import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {
	const items = [
		[
			{label: 'JVM-based Languages', value: 'JVM', type: 'title'},
			{label: 'Python', value: 'Python', type: 'item'},
			{label: 'Scala', value: 'Scala', type: 'item'},
			{label: 'C++', value: 'C++', type: 'item'},
			{label: 'PHP', value: 'PHP', type: 'item'},
			{label: 'C', value: 'C', type: 'item'},
			{label: 'HTML', value: 'HTML', type: 'item'},
			{label: 'CSS', value: 'CSS', type: 'item'},
			{label: 'Javascript', value: 'Javascript', type: 'item'},
			{label: 'Typescript', value: 'Typescript', type: 'item'},
			{label: 'ClojureScript', value: 'ClojureScript', type: 'item'},
			{label: 'YAML', value: 'YAML', type: 'item'}
		],
	]

	const newItems = 
	[
		{label: 'Clojure', value: 'Clojure', type: 'item'},
		{label: 'ClojureScript', value: 'ClojureScript', type: 'item'},
		{label: 'Scala', value: 'Scala', type: 'item'},
		{label: 'Java', value: 'Java', type: 'item'},
	]

	const [dropdownItems, changeDropdownItems] = useState(items)

	return 	<Dropdown 
				title='Products' 
				items={dropdownItems}

				onItemSelect={(text) => {
					const prevItems = dropdownItems
					prevItems.push(newItems)
					changeDropdownItems(prevItems)
				}}
			/>
}

function Dropdown(props) {

	const [selected, changeSelectedTo] = useState('none')
	const [alphabetSelected, changeAlphabetSelectedTo] = useState('*')
	const [searchedText, changeSearchedTextTo] = useState('')
	const [items, setItemsTo] = useState(props.items)
	const [statesIndex, setStatesIndexTo] = useState(props.items.length-1)

	/*********/
	/* ITEMS */
	/*********/
	
	const getItemsJSX = () => {
		let finalItems = items[statesIndex]

		if(alphabetSelected !== '*') finalItems = filterItemsByAlphabetSearch(finalItems)
		if(searchedText !== '') finalItems = filterItemsBySearchedText(finalItems)

		return finalItems.map((item) => {
			const key = item.value
			const isSelected = (selected === item.value)? true : false
			return (
				<DropdownItem 
					name={item.label} selected={isSelected} key={key}
					type={item.type}
					onPress={() => itemHasBeenSelected(item.value)}
				/>
			)
		})
	}

	const itemHasBeenSelected = (value) => {
		changeSelectedTo(value)
		props.onItemSelect(value)

		setStatesIndexTo(props.items.length-1)
		setItemsTo(props.items)
	}

	/*******************/
	/* ALPHABET SEARCH */
	/*******************/

	const alphabetSearchVisible = (items[statesIndex].length > 10)? true : false

	const setAlphabetSearchCharacterTo = (character) => {
		changeAlphabetSelectedTo(character)
		changeSearchedTextTo('')
	}

	const filterItemsByAlphabetSearch = (givenItems) => {
		return givenItems.filter((item) => {
			if(alphabetSelected === '*') return true
			if(alphabetSelected === item.label[0].toLocaleLowerCase()) return true
			return false
		})
	}

	const checkForEmptiness = (itemsJSX) => {
		if(itemsJSX.length === 0) {
			return (
				<View>
					<Text style={{textAlign: 'center', fontWeight: 'bold'}}>Oops! No items exist.</Text>
				</View>
			)
		}
		return itemsJSX
	}

	/**********/
	/* SEARCH */
	/**********/

	const setSearchedTextTo = (text) => {
		changeSearchedTextTo(text)
		changeAlphabetSelectedTo('*')
	}

	const filterItemsBySearchedText = (givenItems) => {
		return givenItems.filter((item) => {
			const finalSearchedText = searchedText.toLocaleLowerCase()
			if(finalSearchedText === '') return true
			if(item.label.toLocaleLowerCase().includes(finalSearchedText)) return true
			return false
		})
	}

	/*********/
	/* STATE */
	/*********/

	const popState = () => {
		setStatesIndexTo(statesIndex-1)
	}

	return (
		<View style={styles.DropdownContainer}>

			{
				(statesIndex !== 0)?
					(
						<View style={styles.DropdownBackButtonContainer}>
							<TouchableOpacity style={styles.DropdownBackButton} onPress={() => popState()}>
								<Text style={[styles.DropdownBackButtonText, {textAlign: 'left'}]}>BACK</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.DropdownBackButton}></TouchableOpacity>
							<TouchableOpacity style={styles.DropdownBackButton}>
								<Text style={[styles.DropdownBackButtonText, {textAlign: 'right'}]}>DONE</Text>
							</TouchableOpacity>
						</View>
					)
					:
					(
						<View style={styles.DropdownBackButtonContainer}>
							<TouchableOpacity style={styles.DropdownBackButton}></TouchableOpacity>
							<TouchableOpacity style={styles.DropdownBackButton}></TouchableOpacity>
							<TouchableOpacity style={styles.DropdownBackButton}>
								<Text style={[styles.DropdownBackButtonText, {textAlign: 'right'}]}>DONE</Text>
							</TouchableOpacity>
						</View>
					)
			}

			<View style={styles.DropdownSearch}>
				<TextInput 	
					style={[styles.DropdownText, {fontWeight: 'bold', fontSize: 16}]} 
					placeholder='Search' 
					value={
						(searchedText === '')?
							((alphabetSelected === '*')? '' : alphabetSelected)
							:
							searchedText
					}
					onChangeText={(text) => setSearchedTextTo(text)}
				/>
				<Icon name="search" size={20} color="#BBB" style={styles.DropdownIcon} />
			</View>

			<View style={styles.DropdownTitleContainer}>
				<Text style={styles.DropdownTitleText}>
					{(props.title)? props.title.toUpperCase() : 'Items'}
				</Text>
			</View>

			<View style={styles.DropdownItemsContainer}>
				<View style={styles.DropdownItemsFrame}>
					
					<ScrollView 
						style={[styles.DropdownItemsList, {width: (alphabetSearchVisible)? '95%' : '100%'}]}
					>
						{checkForEmptiness(getItemsJSX())}
					</ScrollView>
					<DropdownAlphabetSearch 
						visible={alphabetSearchVisible}
						onPress={setAlphabetSearchCharacterTo}
					/>
				</View>
			</View>

		</View>
	)
}

function DropdownItem(props) {
	const iconColor = (props.selected && (props.type != 'title'))? 'green' : 'white'
	const containerStyle = (props.selected && (props.type != 'title'))? '#F8F8F8' : 'white'
	const titleArrow = (props.type === 'title')? (<Text style={{fontSize: 28}}>→</Text>) : (<Text></Text>)

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
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('a')}>A</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('b')}>B</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('c')}>C</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('d')}>D</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('e')}>E</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('f')}>F</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('g')}>G</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('h')}>H</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('i')}>I</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('j')}>J</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('k')}>K</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('l')}>L</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('m')}>M</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('n')}>N</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('o')}>O</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('p')}>P</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('q')}>Q</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('r')}>R</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('s')}>S</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('t')}>T</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('u')}>U</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('v')}>V</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('w')}>W</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('x')}>X</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('y')}>Y</Text>
			<Text style={styles.DropdownItemsAlphabetSearchText} onPress={() => props.onPress('z')}>Z</Text>
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
		fontSize: 18,
		textAlign: 'center',
		color: '#2196f3',
		fontWeight: 'bold'
	},

	DropdownBackButtonContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	DropdownBackButton: {
		width: '33.33%',
		padding: '5%'
	},
	DropdownBackButtonText: {
		width: '100%',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2196f3'
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
