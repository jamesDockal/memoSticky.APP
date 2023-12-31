import { View, Text } from 'react-native';
import styled from 'styled-components';
import { Input } from '../../../../components/Input/input.component';

export const Content = styled(View)`
	padding: 16px 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
	width: 100%;
`;

export const Term = styled(Text)`
	font-size: 32px;
`;

export const Value = styled(Text)`
	font-size: 20px;
`;

export const WriteMeaning = styled(Input)`
	font-size: 20px;
	text-align: center;
`;
