import styled from 'styled-components';

import { Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(View)`
	background-color: ${({ theme }) => theme.colors.darkBackground};
	padding: ${RFValue(16)}px;
	margin-bottom: ${RFValue(16)}px;
`;

export const Label = styled(Text)``;

export const InputComponent = styled(TextInput)``;
