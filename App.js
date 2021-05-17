/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Body, Container, Content, Header, ListItem, Text, Title } from 'native-base';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Alert } from 'react-native';
import SQLite from "react-native-sqlite-storage"
import { optionReducer } from './optionReducer';

const initState = {
	usersList: []
}

const App = () => {
	const [state, dispatch] = useReducer(optionReducer, initState)
	const mounted = useRef(false)
	const { usersList } = state

	let db = SQLite.openDatabase(
		{
			name: 'users.db',
			location: 'default',
		},
		() => successToOpenDB(),
		(err) => failToOpenDB(err)
	)
	// const [usersList, setUsers] = useState([])

	useEffect(() => {
		return () => mounted.current = true
	}, [])

	const successToOpenDB = () => {
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM User', [], (_tx, results) => {
				let dataLength = results.rows.length
				if (dataLength > 0 && !mounted.current) {
					console.log(results);
					let helperArr = []
					for (let i = 0; i < dataLength; i++) {
						helperArr.push(results.rows.item(i))
					}
					dispatch({ type: 'CHANGE', name: 'usersList', value: helperArr})
				}
			})
		})
	}
	
	const failToOpenDB = (err) => {
		Alert.alert(err)
	}

	return (
		<Container>
		<Header noLeft>
			<Body>
				<Title>Header</Title>
			</Body>
		</Header>
		<Content>
			{
				usersList.map((user, i) =>
					<ListItem key={i}>
						<Body>
							<Text>Name: {user.name}</Text>
							<Text note>Age: {user.age}</Text>
						</Body>
					</ListItem>
				)
			}
		</Content>
	</Container>
	);
};

export default App;
