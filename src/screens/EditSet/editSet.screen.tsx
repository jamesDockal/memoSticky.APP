import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { SetCard } from '../../components/SetCard/setCard.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './editSet.styles';
import { Card } from '../../dto/card.dto';
import { EdtiSetStorageService } from '../../factories';

export const EditSet: React.FC = () => {
	const [setCards, setSetCards] = useState<Card[]>([
		{
			id: Math.random() * 10,
			term: '',
			meaning: '',
		},
	]);

	const handleSave = async (editedCard: Card) => {
		const editedSetCards = setCards;
		const index = editedSetCards.findIndex((card) => card.id === editedCard.id);
		editedSetCards[index] = editedCard;

		await EdtiSetStorageService.save(editedSetCards);
	};

	const fetchData = async () => {
		const result = await EdtiSetStorageService.fetchAll();
		setSetCards(result || []);
	};

	const onPlusButtonPress = (): void => {
		setSetCards((oldState) => [
			...oldState,
			{
				id: Math.random() * 10,
				meaning: '',
				term: '',
			},
		]);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			<FlatList
				data={setCards}
				renderItem={({ item, index }) => (
					<SetCard key={item.id} item={item} handleSave={handleSave} />
				)}
			/>

			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
