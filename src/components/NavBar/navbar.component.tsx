import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import { darkTheme } from '../../styles/theme';

import { EditSet } from '../../screens/EditSet/edit-set.screen';
import { LearnSet } from '../../screens/LearnSet/learn-set.screen';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSetContext } from '../../context/set.context';

const editSet = 'Edit Set';
const learningSet = 'Learn Set';

const Tab = createBottomTabNavigator();

const icons = {
	[editSet]: 'pencil-alt',
	[learningSet]: 'book',
};

export const NavBar: React.FC = () => {
	const theme = darkTheme;

	const { allSets, getSetInfo, currentSet } = useSetContext();

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
				initialRouteName={editSet}
				screenOptions={({ route }) => ({
					headerLeft: (props) => (
						<View
							style={{
								marginLeft: 12,
								width: 200,
							}}
						>
							<Dropdown
								style={{}}
								data={allSets.map(({ name, id }) => ({
									label: name,
									value: id,
								}))}
								labelField="label"
								onChange={({ value }) => {
									getSetInfo(value);
								}}
								valueField="value"
								value={currentSet?.id}
								placeholderStyle={{
									color: '#d0d0d0',
								}}
								itemTextStyle={
									{
										// color: '#f8f8f2',
									}
								}
								// containerStyle={{
								// 	color: '#f8f8f2',
								// }}
								selectedTextStyle={{
									color: '#f8f8f2',
								}}
							/>
						</View>
					),
					headerRight: (props) => (
						<View
							style={{
								marginRight: 12,
							}}
						>
							<Feather
								name="settings"
								size={24}
								color="white"
								onPress={() => {
									console.log('props', props);
								}}
							/>
						</View>
					),
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
				<Tab.Screen
					name={editSet}
					component={EditSet}
					options={{
						headerTitle: '',
						// header: () => <></>,
					}}
				/>
				<Tab.Screen name={learningSet} component={LearnSet} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
