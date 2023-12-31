import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputComponent, Label } from './input.styles';
import { themeToType } from '../../constants/theme.constant';

interface Props extends TextInputProps {
	label?: string;
	themeType?: 'dark' | 'light';
}

export const Input: React.FC<Props> = ({
	label,
	themeType = 'dark',
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(true);

	const handleBlur = () => setIsFocused(false);

	return (
		<Container isFocused={isFocused}>
			<Label isFocused={isFocused}>{label}</Label>
			<InputComponent
				onFocus={handleFocus}
				onBlur={handleBlur}
				isFocused={isFocused}
				theme={themeToType[themeType]}
				{...rest}
			/>
		</Container>
	);
};
