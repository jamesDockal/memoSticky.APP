import React from 'react';
import { Input } from '../Input/index.input';
import { Container } from './styles.setCard';

export const SetCard: React.FC = () => {
	return (
		<Container testID="set-card">
			<Input label="Term" />
			<Input
				label="Meaning"
				style={{
					marginTop: 16,
				}}
			/>
		</Container>
	);
};
