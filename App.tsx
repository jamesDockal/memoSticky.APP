import { ThemeProvider } from 'styled-components';
import { EditSet } from './src/screen/EditSet/index.editSet';
import { darkTheme } from './src/styles/theme';
import AppLoading from 'expo-app-loading';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import React from 'react';

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
			<EditSet />
		</ThemeProvider>
	);
};

export default App;
