import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { SetCard } from '../../components/SetCard/setCard.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './editSet.styles';

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
			<FlatList
				data={setCards}
				renderItem={({ item }) => <SetCard key={item.id} />}
			/>

			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
