import styled from 'styled-components';

import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Content = styled(View)`
	background-color: ${({ theme }) => theme.colors?.darkBackground};
	padding: ${RFValue(16)}px;
	padding-top: 0;
	z-index: 1;
	flex: 1;
`;

export const Row = styled(View)`
	flex-direction: row;
	gap: 16px;
	margin-top: 16px;
`;

export const MainPart = styled(View)`
	width: 66%;
`;

export const TipPart = styled(View)`
	width: 33%;
`;
