import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
	Container,
	CardContainer,
	OpacityBackground,
} from './learn-set.styles';
import { Input } from '../../components/Input/input.component';
import { CurrentCard } from './components/current-card/current-card.component';
import { CardDTO, SetDTO } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';
import { useIsFocused } from '@react-navigation/native';
import { useSetContext } from '../../context/set.context';

export const LearnSet: React.FC = () => {
	const isFocused = useIsFocused();
	const { currentSet, setCurrentSet } = useSetContext();

	const [currentCard, setCurrentCard] = useState<CardDTO>({} as CardDTO);


	const onWriteMeaning = async (text: string) => {
		if (text.toLowerCase() === currentCard.meaning.toLowerCase()) {
			let newIndex = currentSet.currentCardIndex + 1;
			if (newIndex >= currentSet.cards.length) {
				newIndex = 0;
			}
			setCurrentSet((oldState) => ({
				...oldState,
				currentCardIndex: newIndex,
			}));
			await setService.setNewCardIndex(currentSet.id,newIndex);
		}
	};

	const onShowCardMeaning = () => {
		setCurrentSet((oldState) => {
			const newCards = [...oldState.cards];
			newCards.splice(oldState.currentCardIndex + 3, 0, currentCard);
			return {
				...oldState,
				cards: newCards,
			};
		});
	};

	useEffect(() => {
		const newCard = currentSet.cards[currentSet?.currentCardIndex || 0]  || currentSet.cards [0]

		setCurrentCard(newCard)
	}, [currentSet?.currentCardIndex,isFocused]);

	console.log('currentCard', currentCard);
	console.log('currentSet?.currentCardIndex', currentSet?.currentCardIndex)

	return (
		<Container source={{ uri: currentCard?.imageUrl }}>
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
