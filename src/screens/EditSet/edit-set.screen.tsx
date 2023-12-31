import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { SetEditCard } from '../../components/SetEditCard/set-edit-card.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './edit-set.styles';
import { Card, Set } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';

const DEFAULT_SET: Set = {
	name: mockSetKey,
	currentCardIndex: 0,
	cards: [
		{
			id: Math.random() * 10,
			term: '',
			meaning: '',
		},
	],
};

export const EditSet: React.FC = () => {
	const [set, setSet] = useState<Set>(DEFAULT_SET);

	const handleSave = async (editedCard: Card) => {
		const editedSetCards = set.cards;
		const index = editedSetCards.findIndex((card) => card.id === editedCard.id);
		editedSetCards[index] = editedCard;

		await setService.save(mockSetKey, {
			currentCardIndex: 0,
			...set,
			cards: editedSetCards,
		});
	};

	const fetchData = async () => {
		const result = await setService.fetch(mockSetKey);
		setSet(result || DEFAULT_SET);
	};

	const onPlusButtonPress = (): void => {
		setSet((oldState) => ({
			...oldState,
			cards: [
				...oldState.cards,
				{
					id: Math.random() * 10,
					meaning: '',
					term: '',
				},
			],
		}));
	};

	useEffect(() => {
		fetchData();
	}, []);
	console.log('set', set);
	return (
		<Container>
			<FlatList
				data={set.cards}
				renderItem={({ item, index }) => (
					<SetEditCard key={item.id} card={item} handleSave={handleSave} />
				)}
			/>

			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
