import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
	position: absolute;
	bottom: ${RFValue(15)}px;
	right: ${RFValue(15)}px;

	width: ${RFValue(50)}px;
	height: ${RFValue(50)}px;
	border-radius: ${RFValue(50)}px;

	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.green};
`;

export const PlusIcon = styled(Entypo).attrs({
	name: 'plus',
})`
	font-size: ${RFValue(32)}px;
	color: ${({ theme }) => theme.colors.lightText};
`;
