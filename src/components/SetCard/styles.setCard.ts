import styled, { css } from 'styled-components';

import { Text, TextInput, View } from 'react-native';

export const Container = styled(View)`
	background-color: ${({ theme }) => theme.colors.darkBackground};
	padding: 16px;
`;

export const Label = styled(Text)``;

export const InputComponent = styled(TextInput)``;
