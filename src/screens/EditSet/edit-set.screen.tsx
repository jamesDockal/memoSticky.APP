import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { SetEditCard } from '../../components/SetEditCard/set-edit-card.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './edit-set.styles';
import { CardDTO, SetDTO } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';
import { useIsFocused } from '@react-navigation/native';

const DEFAULT_SET: SetDTO = {
	// name: mockSetKey,
	name: 'name',
	currentCardIndex: 0,
	cards: [
		{
			term: '',
			meaning: '',
		} as any,
	],
};

export const EditSet: React.FC = () => {
	const [set, setSet] = useState<SetDTO>(setService.localSet);
	const [isLoading, setIsLoading] = useState(true);

	const isFocused = useIsFocused();

	const handleSave = async (editedCard: CardDTO) => {
		if (!editedCard.meaning || !editedCard.term) return;

		const card = await setService.addNewCard(editedCard);

		const editedSetCards = set.cards;

		const index = editedSetCards.findIndex((card) => card.id === card.id);
		editedSetCards[index] = card;

		const removedEmpty = editedSetCards.filter(
			(card) => card.meaning && card.term
		);

		await setService.saveProperty(
			setService.localStorageKey,
			'cards',
			removedEmpty
		);
	};

	const fetchData = async () => {
		setIsLoading(true);
		const result = await setService.fetch();
		if (!result?.cards.length) {
			result.cards = DEFAULT_SET.cards;
		}
		setSet(result || DEFAULT_SET);
		setIsLoading(false);
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
		if (isFocused) {
			fetchData();
		}
	}, [isFocused]);

	return (
		<Container>
			{isLoading && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						position: 'absolute',
						right: 8,
					}}
				>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			)}
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
