import { useCallback, useEffect, useState } from 'react';
import { useSetContext } from '../src/context/set.context';
import { CardDTO, SetDTO } from '../src/dto/set.dto';
import { setService } from '../src/factories';
import {
	Container,
	CardContainer,
	OpacityBackground,
} from '../src/screens/LearnSet/learn-set.styles';
import { CurrentCard } from '../src/screens/LearnSet/components/current-card/current-card.component';
import Checkbox from 'expo-checkbox';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect } from 'expo-router';

const LearnSet: React.FC = () => {
	const { currentSet, setCurrentSet } = useSetContext();
	const [learnSet, setLearnSet] = useState(currentSet);

	const [writeMeaning, setWritingMeaning] = useState(false);
	const [currentCard, setCurrentCard] = useState<CardDTO>({} as CardDTO);

	const onWriteMeaning = async (text: string) => {
		if (text.toLowerCase() === currentCard.meaning.toLowerCase()) {
			let newIndex = learnSet.currentCardIndex + 1;
			if (newIndex >= learnSet.cards.length) {
				newIndex = 0;
			}

			setLearnSet((oldState) => ({
				...oldState,
				currentCardIndex: newIndex,
			}));

			await setService.setNewCardIndex(learnSet.id, newIndex);
		}
	};

	const onShowCardMeaning = () => {
		setLearnSet((oldState) => {
			const newCards = [...oldState.cards];
			newCards.splice(oldState.currentCardIndex + 3, 0, currentCard);
			return {
				...oldState,
				cards: newCards,
			};
		});
	};

	const setNewCard = () => {
		const index = learnSet?.currentCardIndex || currentSet?.currentCardIndex;

		const newCard = learnSet.cards[index || 0];

		const cardused: CardDTO = {
			id: newCard.id,
			setId: newCard.setId,
			imageUrl: newCard.imageUrl,

			term: writeMeaning ? newCard.meaning : newCard.term,
			termTip: writeMeaning ? newCard.meaningTip : newCard.termTip,
			meaning: writeMeaning ? newCard.term : newCard.meaning,
			meaningTip: writeMeaning ? newCard.meaningTip : newCard.meaningTip,
		};
		// console.log('cardused', cardused);

		Speech.speak(cardused.term);

		setCurrentCard(newCard);
	};

	const onChangeCheckbox = async (newValue: boolean) => {
		const index = learnSet?.currentCardIndex || currentSet?.currentCardIndex;

		const card = learnSet.cards[index];

		const cardused: CardDTO = {
			id: card.id,
			setId: card.setId,
			imageUrl: card.imageUrl,

			term: newValue ? card.meaning : card.term,
			termTip: newValue ? card.meaningTip : card.termTip,
			meaning: newValue ? card.term : card.meaning,
			meaningTip: newValue ? card.meaningTip : card.meaningTip,
		};

		setCurrentCard(cardused);
		setWritingMeaning(newValue);
		await setService.setIsWritingMeaning(currentSet.id, newValue);
	};

	useEffect(() => {
		setNewCard();
	}, [learnSet?.currentCardIndex, currentSet?.currentCardIndex]);

	useEffect(() => {
		setLearnSet(currentSet);
		setService.getIsWritingMeaning(currentSet.id).then(({ value }: any) => {
			setWritingMeaning(value);
		});
	}, [currentSet?.id]);

	useFocusEffect(
		useCallback(() => {
			setNewCard();
		}, [learnSet?.id])
	);

	return (
		<Container
			source={{
				// uri: currentCard?.imageUrl
				uri: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
			}}
		>
			<View
				style={{
					position: 'absolute',
					top: 16,
					flexDirection: 'row',
					gap: 8,
				}}
			>
				<Checkbox
					value={writeMeaning}
					onValueChange={onChangeCheckbox}
					color={writeMeaning ? 'green' : 'red'}
				/>

				<Text
					style={{
						color: writeMeaning ? 'green' : 'red',
					}}
				>
					{writeMeaning ? 'Escrever meaning' : 'Escrever term'}
				</Text>
			</View>

			<CardContainer>
				<OpacityBackground />
				{currentCard?.id && (
					<CurrentCard
						card={currentCard}
						onWriteMeaning={onWriteMeaning}
						onShowCardMeaning={onShowCardMeaning}
					/>
				)}
			</CardContainer>
		</Container>
	);
};

export default LearnSet;
