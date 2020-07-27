import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function App() {

	const selectItems = [
		[
			{label: 'Retail', value: 'Retail', type: 'item'},
			{label: 'Restaurant', value: 'Restaurant', type: 'item'},
			{label: 'Bar', value: 'Bar', type: 'item'},
		]
	]

	return 	<Select 
				title='Business Types' 
				items={selectItems}

				placeholder='Select a language...'
				selectedItem={'Bar'}

				onItemSelect={(text) => {}}
			/>
}

function Select(props) {

	const [selected, changeSelectedTo] = useState((props.selectedItem)? props.selectedItem : 'none')
	const [alphabetSelected, changeAlphabetSelectedTo] = useState('*')
	const [searchedText, changeSearchedTextTo] = useState('')
	const [items, setItemsTo] = useState(props.items)
	const [statesIndex, setStatesIndexTo] = useState(props.items.length-1)
	const [modalVisible, toggleModalVisibility] = useState(false)

	const onCategorySelect = (props.onCategorySelect)? props.onCategorySelect : (text) => {}

	const boxTextStyles = (props.boxTextStyles)? props.boxTextStyles : {}
	const boxContainerStyles = (props.boxContainerStyles)? props.boxContainerStyles : {}

	const buttonsStyles = (props.buttonStyles)? props.buttonsStyles : {}
	const titleContainerStyles = (props.titleContainerStyles)? props.titleContainerStyles : {}
	const titleTextStyles = (props.titleTextStyles)? props.titleTextStyles : {}

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
				<SelectItem 
					name={item.label} selected={isSelected} key={key}
					type={item.type}
					onPress={
						(item.type === 'category')? 
							() => categoryHasBeenSelected(item.value) : () => itemHasBeenSelected(item.value)
					}
				/>
			)
		})
	}

	const categoryHasBeenSelected = (value) => {
		onCategorySelect(value)

		changeAlphabetSelectedTo('*')
		changeSearchedTextTo('')

		setStatesIndexTo(props.items.length-1)
		setItemsTo(props.items)
	}

	const itemHasBeenSelected = (value) => {
		changeSelectedTo(value)
		props.onItemSelect(value)
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

		let newItems = items
		newItems.pop()
		setItemsTo(items)
	}

	return (
		<View style={{paddingTop: '10%'}}>

			{ /* 'TEXTBOX' FOR SELECTED OPTION */}
			<TouchableOpacity 
				onPress={() => toggleModalVisibility(!modalVisible)} 
				style={[styles.SelectInput, boxContainerStyles]}
			>
				<Text style={[styles.SelectInputText, boxTextStyles]}>
					{(selected === 'none')? props.placeholder : selected}
				</Text>
			</TouchableOpacity>

			{ /* SELECT COMPONENT MODAL */}
			<Modal visible={modalVisible}>
				<View style={styles.SelectContainer}>

					{/* 'BACK' AND 'DONE' BUTTONS */}
					{
						(statesIndex !== 0)?
						(
							<View style={styles.SelectBackButtonContainer}>
								<TouchableOpacity style={[styles.SelectBackButton, buttonsStyles]} onPress={() => popState()}>
									<Text style={[styles.SelectBackButtonText, {textAlign: 'left'}]}>BACK</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.SelectBackButton}></TouchableOpacity>
								<TouchableOpacity style={[styles.SelectBackButton, buttonsStyles]} onPress={() => toggleModalVisibility(!modalVisible)}>
									<Text style={[styles.SelectBackButtonText, {textAlign: 'right'}]}>DONE</Text>
								</TouchableOpacity>
							</View>
						)
						:
						(
							<View style={styles.SelectBackButtonContainer}>
								<TouchableOpacity style={styles.SelectBackButton}></TouchableOpacity>
								<TouchableOpacity style={styles.SelectBackButton}></TouchableOpacity>
								<TouchableOpacity style={[styles.SelectBackButton, buttonsStyles]} onPress={() => toggleModalVisibility(!modalVisible)}>
									<Text style={[styles.SelectBackButtonText, {textAlign: 'right'}]}>DONE</Text>
								</TouchableOpacity>
							</View>
						)
					}

					{ /* SEARCH BOX */}
					<View style={styles.SelectSearch}>
						<TextInput 	
							style={[styles.SelectText, {fontWeight: 'bold', fontSize: 16}]} 
							placeholder='Search' 
							value={
								(searchedText === '')?
									((alphabetSelected === '*')? '' : alphabetSelected)
									:
									searchedText
							}
							onChangeText={(text) => setSearchedTextTo(text)}
						/>
						<Icon name="search" size={20} color="#BBB" style={styles.SelectIcon} />
					</View>

					{/* TITLE */}
					<View style={[styles.SelectTitleContainer, titleContainerStyles]}>
						<Text style={[styles.SelectTitleText, titleTextStyles]}>
							{(props.title)? props.title.toUpperCase() : 'Items'}
						</Text>
					</View>

					{/* ITEMS LIST */}
					<View style={styles.SelectItemsContainer}>
						<View style={styles.SelectItemsFrame}>
							
							{/* ITEMS LIST SCROLLVIEW */}
							<ScrollView 
								style={[styles.SelectItemsList, 
										{width: (alphabetSearchVisible)? '95%' : '100%'}]}
							>
								{checkForEmptiness(getItemsJSX())}
							</ScrollView>

							{/* ALPHABET SEARCH */}
							<SelectAlphabetSearch 
								visible={alphabetSearchVisible}
								onPress={setAlphabetSearchCharacterTo}
							/>
						</View>
					</View>

				</View>
			</Modal>
		
		</View>
	)
}

function SelectItem(props) {
	const iconColor = (props.selected && (props.type != 'category'))? 'green' : 'white'
	const containerStyle = (props.selected && (props.type != 'category'))? '#F8F8F8' : 'white'

	return (
		<TouchableOpacity style={{width: '100%'}} onPress={props.onPress}>
			<View style={[styles.SelectItemContainer, {backgroundColor: containerStyle}]}>
				<Text style={[styles.SelectText]}>
					{props.name}
				</Text>
				<Icon name="check-circle" size={20} color={iconColor} style={styles.SelectIcon} />
			</View>
		</TouchableOpacity>
	)
}

function SelectAlphabetSearch(props) {
	const display = (props.visible)? 'flex' : 'none'
	return (
		<View style={[styles.SelectItemsAlphabetSearch, {display: display}]}>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('a')}>A</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('b')}>B</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('c')}>C</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('d')}>D</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('e')}>E</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('f')}>F</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('g')}>G</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('h')}>H</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('i')}>I</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('j')}>J</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('k')}>K</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('l')}>L</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('m')}>M</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('n')}>N</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('o')}>O</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('p')}>P</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('q')}>Q</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('r')}>R</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('s')}>S</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('t')}>T</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('u')}>U</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('v')}>V</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('w')}>W</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('x')}>X</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('y')}>Y</Text>
			<Text style={styles.SelectItemsAlphabetSearchText} onPress={() => props.onPress('z')}>Z</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	SelectContainer: {
		width: '100%',
		flex: 1
	},

	SelectSearch: {
		width: '100%',
		flexDirection: 'row',
		paddingVertical: '4%',
		backgroundColor: 'white',
		elevation: 4
	},
	SelectText: {
		width: '80%',
		marginLeft: '5%',
		fontSize: 16
	},
	SelectIcon: {
		marginLeft: '3%'
	},

	SelectTitleContainer: {
		width: '100%',
		paddingTop: '6%',
		paddingBottom: '3%'
	},
	SelectTitleText: {
		width: '90%',
		marginHorizontal: '5%',
		fontSize: 18,
		textAlign: 'center',
		color: '#2196f3',
		fontWeight: 'bold'
	},

	SelectBackButtonContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	SelectBackButton: {
		width: '33.33%',
		padding: '5%'
	},
	SelectBackButtonText: {
		width: '100%',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		color: '#2196f3'
	},

	SelectItemsContainer: {
		width: '100%',
		height: 100,
		flexDirection: 'row'
	},
	SelectItemsFrame: {
		width: '100%',
		flexDirection: 'row',
		flex: 1
	},
	SelectItemsList: {
		width: '95%',
		height: 500
	},
	SelectItemsAlphabetSearch: {
		width: '5%'
	},
	SelectItemsAlphabetSearchText: {
		width: '100%',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 10,
		color: '#787878',
		marginVertical: '10%'
	},	

	SelectItemContainer: {
		width: '100%',
		paddingVertical: '4%',
		flexDirection: 'row'
	},

	SelectInput: {
		width: '40%',
		marginHorizontal: '30%',
		paddingVertical: '3%',
		borderWidth: 1,
		borderRadius: 3,
		borderColor: 'black'
	},

	SelectInputText: {
		textAlign: 'center'
	}
});