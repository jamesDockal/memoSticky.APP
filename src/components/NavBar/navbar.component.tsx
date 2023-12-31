import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import { darkTheme } from '../../styles/theme';

import { EditSet } from '../../screens/EditSet/edit-set.screen';
import { LearnSet } from '../../screens/LearnSet/learn-set.screen';

const editSet = 'Edit Set';
const learningSet = 'Learn Set';

const Tab = createBottomTabNavigator();

const icons = {
	[editSet]: 'pencil-alt',
	[learningSet]: 'book',
};

export const NavBar: React.FC = () => {
	const theme = darkTheme;

	return (
		<NavigationContainer
			theme={
				{
					colors: {
						card: theme.colors.darkBackground,
						primary: theme.colors.green,
						text: theme.colors.lightText,
					},
				} as any
			}
		>
			<Tab.Navigator
				initialRouteName={learningSet}
				screenOptions={({ route }) => ({
					tabBarStyle: {
						paddingTop: 8,
					},
					tabBarLabel: '',
					tabBarIcon: ({ focused, color, size }) => {
						const rn = route.name;
						const icon = icons[rn];

						return <FontAwesome5 name={icon} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name={editSet} component={EditSet} />
				<Tab.Screen name={learningSet} component={LearnSet} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
