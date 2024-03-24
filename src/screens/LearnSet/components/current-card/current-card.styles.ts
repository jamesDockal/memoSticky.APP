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
	font-weight: bold;
`;

export const TermTip = styled(Text)`
	font-size: 28px;
	font-weight: 700;
`;

export const MeaningBox = styled(View)`
	width: 100%;
	padding: 16px;
	border: 3px solid ${({ theme }) => theme.colors.red};
	align-items: center;
`;

export const Meaning = styled(Text)`
	font-size: 24px;
	font-weight: 700;
	text-decoration: underline;
`;

export const MeaningTip = styled(Text)`
	font-size: 18px;
	font-weight: 700;
`;

export const WriteMeaning = styled(Input)`
	font-size: 20px;
	text-align: center;
`;
