import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { SetProvider } from '../context/set.context';
import { darkTheme } from '../styles/theme';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';
import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import SelectSet from '../components/SelectSet/select-set.component';

export default function RootLayout() {
	const theme = darkTheme;

	const [isLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isLoaded) {
		return <Text>loading</Text>;
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<SetProvider>
				<Tabs
					screenOptions={{
						headerStyle: {
							backgroundColor: theme.colors.darkBackground,
						},
						tabBarItemStyle: {
							backgroundColor: theme.colors.darkBackground,
						},
						headerLeft: () => (
							<View
								style={{
									marginLeft: 12,
									width: 200,
								}}
							>
								<SelectSet />
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
						headerTitle: '',
					}}
				>
					<Tabs.Screen
						name="index"
						options={{
							tabBarLabel: () => {
								return null;
							},
							tabBarIcon: (props) => {
								return (
									<FontAwesome5
										name="pencil-alt"
										size={props.size}
										color={
											props.focused
												? theme.colors.green
												: theme.colors.lightText
										}
									/>
								);
							},
						}}
					/>
					<Tabs.Screen
						name="learn-set"
						options={{
							tabBarLabel: () => {
								return null;
							},
							tabBarIcon: (props) => {
								return (
									<FontAwesome5
										name="book"
										size={props.size}
										color={
											props.focused
												? theme.colors.green
												: theme.colors.lightText
										}
									/>
								);
							},
						}}
					/>
				</Tabs>
			</SetProvider>
		</ThemeProvider>
	);
}
