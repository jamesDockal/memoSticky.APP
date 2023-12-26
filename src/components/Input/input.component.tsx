import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputComponent, Label } from './input.styles';

interface Props extends TextInputProps {
	label?: string;
}

export const Input: React.FC<Props> = ({ label, ...rest }) => {
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
				{...rest}
			/>
		</Container>
	);
};
