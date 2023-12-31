import styled from 'styled-components';

import { Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(View)`
	background-color: ${({ theme }) => theme.colors.darkBackground};
	padding: ${RFValue(16)}px;
	margin: ${RFValue(16)}px auto;
	width: 75%;
	z-index: 1;
`;

export const Label = styled(Text)``;

export const InputComponent = styled(TextInput)``;
