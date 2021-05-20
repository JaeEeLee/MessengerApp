import { View } from 'native-base'
import React, { useRef, useState } from 'react'
import { Alert, FlatList, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { queryAllTodoLists } from '../databases/allSchemas'

const TodoListComponent = () => {
	const popupDialog = useRef()
	const [todoLists, setTodoLists] = useState([])

	const reloadData = () => {
		queryAllTodoLists().then(todoLists => {
			setTodoLists(todoLists)
		}).catch(err => {
			setTodoLists([])
		})

		console.log('reloadData');
	}


	return <View style={styles.container}>
		{/* <HeaderComponent /> */}
		<FlatList
			style={styles.flatList}
			data={todoLists}
			renderItem={({ item, index }) =>
				<FlatListItem
					{...item}
					itemIndex={index}
					// popupDialogComponent={this.refs.popupDialogComponent} //?
					// popupDialogComponent={this.refs.popupDialogComponent} //?
					onPressItem={() => { alert('You pressed item') }} />}
			keyExtractor={item => item.id} />
		{/* <PopupDialogComponent ref={"popupDialogComponent"} /> */}
	</View>
}

let FlatListItem = props => {
	const { itemIndex, id, name, creationDate, PopupDialogComponent, onPressItem } = props

	const showEditModal = () => {

	}

	const showDeleteConfirmation = () => {
		Alert.alert(
			'Delete',
			'Delete a todoList',
			[
				{ text: 'No', onPress: () => { }, style: 'cancel' },
				{ text: 'Yes', onPress: () => { }, style: 'cancel' },
				{ cancelable: true }
			]
		)
	}

	return (
		<Swipeout right={[
			{
				text: 'Edit',
				backgroundColor: 'rgb(81, 134, 237)',
				onPress: showEditModal
			},
			{
				text: 'Delete',
				backgroundColor: 'rgb(217, 80 64)',
				onPress: showDeleteConfirmation
			}
		]} autoClose={true}>

		</Swipeout>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	flatList: {
		flex: 1,
		flexDirection: 'column'
	}
})

export default TodoListComponent