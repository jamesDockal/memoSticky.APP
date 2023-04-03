import React from 'react';
import { Input } from '../Input/input.component';
import { Container } from './setCard.styles';

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
