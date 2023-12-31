import { ImageBackground, Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(ImageBackground)`
	background-color: ${({ theme }) => theme.colors.background};
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const CardContainer = styled(View)`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	position: relative;
`;

export const OpacityBackground = styled(View)`
	background-color: white;
	opacity: 0.9;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;
