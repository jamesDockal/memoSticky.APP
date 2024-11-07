import { useCallback, useEffect, useState } from 'react';
import { useSetContext } from '../src/context/set.context';
import { CardDTO } from '../src/dto/set.dto';
import { setService } from '../src/factories';
import {
	Container,
	CardContainer,
	OpacityBackground,
} from '../src/screens/LearnSet/learn-set.styles';
import { CurrentCard } from '../src/screens/LearnSet/components/current-card/current-card.component';
import Checkbox from 'expo-checkbox';
import { Button, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect, router } from 'expo-router';

const LearnSet: React.FC = () => {
	const { currentSet, setCurrentSet, cardsRef } = useSetContext();

	const [writeMeaning, setWritingMeaning] = useState(false);
	const [currentCard, setCurrentCard] = useState<CardDTO>({} as CardDTO);
	const [isGeneratingImage, setIsGeneratingImage] = useState(false);

	const onWriteMeaning = async (text: string) => {
		if (
			text.trim().toLowerCase() === currentCard.meaning.trim().toLowerCase()
		) {
			let newIndex = currentSet.currentCardIndex + 1;
			if (newIndex >= currentSet.cards.length) {
				newIndex = 0;
			}

			setCurrentSet((oldState) => ({
				...oldState,
				currentCardIndex: newIndex,
			}));

			await setService.setNewCardIndex(currentSet.id, newIndex);
		}
	};

	const onShowCardMeaning = () => {
		setCurrentSet((oldState) => {
			speakText(currentCard.meaning);

			const newCards = [...oldState.cards];

			const cardused: CardDTO = {
				id: currentCard?.id,
				setId: currentCard?.setId,
				imageUrl: currentCard?.imageUrl,

				term: writeMeaning ? currentCard?.meaning : currentCard?.term,
				termTip: writeMeaning ? currentCard?.meaningTip : currentCard?.termTip,
				meaning: writeMeaning ? currentCard?.term : currentCard?.meaning,
				meaningTip: writeMeaning
					? currentCard?.termTip
					: currentCard?.meaningTip,
			};

			newCards.splice(oldState.currentCardIndex + 3, 0, cardused);
			return {
				...oldState,
				cards: newCards,
			};
		});
	};

	const setNewCard = async () => {
		let index = currentSet?.currentCardIndex || 0;
		const newCard = currentSet.cards[index] || ({} as CardDTO);

		if (index >= currentSet.cards.length) {
			index = 0;
			await setService.setNewCardIndex(currentSet.id, 0);
		}

		const cardused: CardDTO = {
			id: newCard.id,
			setId: newCard.setId,
			imageUrl: newCard.imageUrl,

			term: writeMeaning ? newCard.meaning : newCard.term,
			termTip: writeMeaning ? newCard.meaningTip : newCard.termTip,
			meaning: writeMeaning ? newCard.term : newCard.meaning,
			meaningTip: writeMeaning ? newCard.termTip : newCard.meaningTip,
		};

		speakText(cardused.term);

		setCurrentCard(cardused);
	};

	const onChangeCheckbox = async (newValue: boolean) => {
		setWritingMeaning(newValue);
		await setService.setIsWritingMeaning(currentSet.id, newValue);
	};

	const speakText = (text: string) => {
		Speech.speak(text, {
			language: 'zh-CH',
		});
	};

	const generateImage = async (cardId: string | number) => {
		try {
			setIsGeneratingImage(true);
			const url = await setService.generateImage(cardId);

			setCurrentCard((oldState) => ({
				...oldState,
				imageUrl: url,
			}));
			setCurrentSet((oldState) => {
				const currentCardIndex = currentSet?.currentCardIndex;
				const copy = [...oldState.cards];
				copy[currentCardIndex] = {
					...copy[currentCardIndex],
					imageUrl: url,
				};

				return {
					...oldState,
					cards: copy,
				};
			});
		} catch (error) {
		} finally {
			setIsGeneratingImage(false);
		}
	};

	useEffect(() => {
		setNewCard();
	}, [writeMeaning, currentSet?.currentCardIndex]);

	useEffect(() => {
		setCurrentSet(currentSet);
		setService.getIsWritingMeaning(currentSet.id).then(({ value }: any) => {
			setWritingMeaning(value);
		});
	}, [currentSet?.id]);

	useFocusEffect(
		useCallback(() => {
			setNewCard();
		}, [writeMeaning, currentSet?.id])
	);

	return (
		<Container
			source={{
				uri: currentCard?.imageUrl,
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

				<Button
					title="scroll"
					onPress={() => {
						cardsRef?.current?.scrollToIndex({
							animated: true,
							index: currentSet.currentCardIndex,
						});
						router.navigate('');
					}}
				/>

				<Button title="speak" onPress={() => speakText(currentCard?.meaning)} />

				<Button
					title="generate image"
					onPress={() => generateImage(currentCard?.id)}
					disabled={isGeneratingImage}
				/>
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
