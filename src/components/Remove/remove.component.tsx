import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface Props extends TouchableOpacityProps {}

export const Remove: React.FC<Props> = ({ ...props }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity {...props}>
			<Ionicons name="ios-close-circle" size={40} color={colors.red} />
		</TouchableOpacity>
	);
};
