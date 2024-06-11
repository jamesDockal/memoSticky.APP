import { ThemeProvider } from 'styled-components';
// import { EditSet } from './src/screen/EditSet/index.editSet';
import { darkTheme } from './src/styles/theme';
import AppLoading from 'expo-app-loading';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import React from 'react';
import { NavBar } from './src/components/NavBar/navbar.component';
import { StatusBar, Text } from 'react-native';
import { LoginScreen } from './src/screens/Login/login.screen';
import { SetProvider } from './src/context/set.context';

const App: React.FC = () => {
	const [isLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<SetProvider>
				<StatusBar backgroundColor={darkTheme.colors.darkBackground} />
				<NavBar />
				{/* <LoginScreen /> */}
			</SetProvider>
		</ThemeProvider>
	);
};

export default App;
