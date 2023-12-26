import { ImageBackground, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(ImageBackground)`
	background-color: ${({ theme }) => theme.colors.background};
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;
