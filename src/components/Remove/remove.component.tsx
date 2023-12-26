import React from 'react';
import { View, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface Props extends ViewProps {}

export const Remove: React.FC<Props> = ({ ...props }) => {
	const { colors } = useTheme();
	return (
		<View {...props}>
			<Ionicons name="ios-close-circle" size={40} color={colors.red} />
		</View>
	);
};
