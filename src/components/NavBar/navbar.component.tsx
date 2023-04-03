import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import { EditSet } from '../../screens/EditSet/editSet.screen';
import { darkTheme } from '../../styles/theme';

const homeName = 'Edit Set';

const Tab = createBottomTabNavigator();

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
				initialRouteName={homeName}
				screenOptions={({ route }) => ({
					tabBarStyle: {
						paddingTop: 8,
					},
					tabBarLabel: '',
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						const rn = route.name;
						console.log('color', color);

						if (rn === homeName) {
							iconName = focused ? 'pencil-alt' : 'penny-arcade';
						}

						// return <Ionicons name="pen" size={size} color={color} />;
						return <FontAwesome5 name={iconName} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name={homeName} component={EditSet} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
