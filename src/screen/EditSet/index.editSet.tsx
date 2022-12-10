import React, { useState } from 'react';
import { Plus } from '../../components/Plus/index.plus';

import { SetCard } from '../../components/SetCard/index.setCard';
import { Container } from './styles.editSet';

export const EditSet: React.FC = () => {
	const [setCards, setSetCards] = useState([
		{
			id: 1,
		},
	]);

	const onPlusButtonPress = (): void => {
		setSetCards((oldState) => [
			...oldState,
			{
				id: oldState[oldState.length - 1].id + 1,
			},
		]);
	};

	return (
		<Container>
			{setCards.map(({ id }) => (
				<SetCard key={id} />
			))}
			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
