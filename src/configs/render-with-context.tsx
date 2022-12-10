import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/theme';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export const renderWithContext = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
