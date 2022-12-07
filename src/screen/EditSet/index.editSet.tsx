import React from 'react';
import { AddCard } from '../../components/AddCard/index.addCard';

import { SetCard } from '../../components/SetCard/index.setCard';
import { Container } from './styles.editSet';

export const EditSet: React.FC = () => {
	return (
		<Container>
			<SetCard />
			<AddCard />
		</Container>
	);
};
