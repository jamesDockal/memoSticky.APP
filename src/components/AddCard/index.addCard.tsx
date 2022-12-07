import React from 'react';
import { Text } from 'react-native';
import { Container } from './styles.addCard';

export const AddCard: React.FC = () => {
	return (
		<Container testID="add-set-card">
			<Text>ads</Text>
		</Container>
	);
};

// "jest": {
// 	"preset": "jest-expo",

// 	"moduleNameMapper": {
// 		"@App/(.*)": "<rootDir>/src/$1",
// 		"@Shared/(.*)": "<rootDir>/src/Shared/$1"
// 	},
// 	"roots": [
// 		"<rootDir>/src"
// 	]
// },
