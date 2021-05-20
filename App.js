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
import TodoListComponent from './components/TodoListComponent';
import { optionReducer } from './optionReducer';

const initState = {
	usersList: []
}

const App = () => {
	return (
		<TodoListComponent/>
	)
};

export default App;
