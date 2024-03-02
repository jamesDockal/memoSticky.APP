import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import { SetEditCard } from '../../components/SetEditCard/set-edit-card.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './edit-set.styles';
import { CardDTO, SetDTO } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';

const DEFAULT_SET: SetDTO = {
	name: mockSetKey,
	currentCardIndex: 0,
	cards: [
		{
			term: '',
			meaning: '',
		} as any,
	],
};

export const EditSet: React.FC = () => {
	const [set, setSet] = useState<SetDTO>(DEFAULT_SET);

	const handleSave = async (editedCard: CardDTO) => {
		if (!editedCard.meaning || !editedCard.term) return;

		const card = await setService.addNewCard(editedCard);

		const editedSetCards = set.cards;

		const index = editedSetCards.findIndex((card) => card.id === card.id);
		editedSetCards[index] = card;

		const removedEmpty = editedSetCards.filter(
			(card) => card.meaning && card.term
		);

		await setService.saveProperty(mockSetKey, 'cards', removedEmpty);
	};

	const fetchData = async () => {
		const result = await setService.fetch(mockSetKey);
		if (!result?.cards.length) {
			result.cards = DEFAULT_SET.cards;
		}
		setSet(result || DEFAULT_SET);
	};

	const onPlusButtonPress = (): void => {
		setSet((oldState) => ({
			...oldState,
			cards: [
				...oldState.cards,
				{
					meaning: '',
					term: '',
				} as any,
			],
		}));
	};

	useEffect(() => {
		fetchData();
	}, []);

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
