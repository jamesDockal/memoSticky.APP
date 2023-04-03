import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, PlusIcon } from './plus.styles';

interface Props extends TouchableOpacityProps {}

export const Plus: React.FC<Props> = ({ ...rest }) => {
	return (
		<Container testID="plus-component" accessibilityRole="button" {...rest}>
			<PlusIcon />
		</Container>
	);
};
