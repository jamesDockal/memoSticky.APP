import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

export const Container = styled(View)`
	position: absolute;

	bottom: ${RFValue(15)}px;
	right: ${RFValue(15)}px;
`;

/* background-color: ${({ theme }) => theme.colors.green}; */
