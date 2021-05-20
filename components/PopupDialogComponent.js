import { View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { insertNewTodoList } from '../databases/allSchemas'
import Dialog, { DialogTitle } from 'react-native-popup-dialog'


const PopupDialogComponent = () => {
	// const popupDialog = useRef()
	const [id, setId] = useState(0)
	const [name, setName] = useState('')
	const [isAddNew, setAddNew] = useState(true)
	const [dialogTitle, setDialogTitle] = useState('')
	const [popup, setPopup] = useState(false)

	const showDialogComponentForAdd = () => {
		// if (popupDialog.current)
	}

	return (
		<Dialog
			visible={popup}
			width={0.7}
			height={180}
			dialogTitle={<DialogTitle title={dialogTitle} />}
			onTouchOutside={() => setPopup(false)}
			// ref={popupDialog}
		>
		{/* <PopupDialog
			dialogTitle={<DialogTitle title={dialogTitle} />}
			width={0.7}
			height={180}
			ref={popupDialog}
		> */}
			<View style={styles.container}>
				<TextInput
					value={name}
					placeholder="입력"
					autoCorrect={false}
					style={styles.textInput}
					onChangeText={(text) => setName(text)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						if(name.trim() == "")
							return alert("내용을 입력하세요")
						
						// if(!popup) {
						setPopup(false).then(() => {
							if(isAddNew == true) {
								const newTodoList = {
									id: Math.floor(Date.now() / 10000),
									name: name,
									creationDate: new Date()
								}
								insertNewTodoList(newTodoList).then().catch(err => {
									alert(`Insert Error Occuerd: ${err}`)	
								})
							}
						})
						// }
					}}
				>
					<Text style={styles.textLabel}>저장</Text>
				</TouchableOpacity>
			</View>
		</Dialog>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'content',
		alignItems: 'center'
	},
	textInput: {
		height: 40,
		padding: 10,
		margin:10,
		borderColor: 'gray',
		borderWidth: 1
	},
	button: {
		backgroundColor: 'steelblue',
		padding: 10,
		margin: 10,
	},
	textLabel: {
		colot: 'white',
		fontSize: 18,
	},
})

export default PopupDialogComponent