import styled, { css } from 'styled-components';

import { Text, TextInput, View } from 'react-native';

type ContainerProps = {
	isFocused: boolean;
};

export const Container = styled(View)<ContainerProps>``;

type LabelProps = {
	isFocused: boolean;
};

export const Label = styled(Text)<LabelProps>`
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.bold};
	color: ${({ theme }) => theme.colors.blurText};

	${({ isFocused }) =>
		isFocused &&
		css`
			color: ${({ theme }) => theme.colors.lightText};
		`}
`;

type InputProps = {
	isFocused: boolean;
};

export const InputComponent = styled(TextInput)<InputProps>`
	border-bottom-width: 2px;
	border-color: ${({ theme }) => theme.colors.blurText};
	/* transition: 0.3s; */

	${({ isFocused }) =>
		isFocused &&
		css`
			border-color: ${({ theme }) => theme.colors.lightText};
			color: ${({ theme }) => theme.colors.lightText};
		`}
`;
