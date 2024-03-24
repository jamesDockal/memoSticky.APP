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

export const LearnSet: React.FC = () => {
	const isFocused = useIsFocused();

	const [set, setSet] = useState<SetDTO>({} as SetDTO);
	const [currentCard, setCurrentCard] = useState<CardDTO>({} as CardDTO);

	const fetchData = async () => {
		const result = (await setService.fetch()) || ({} as SetDTO);
		setSet(result);
		if (result?.cards) {
			setCurrentCard(result?.cards[result.currentCardIndex]);
		}
	};

	const onWriteMeaning = async (text: string) => {
		if (text === currentCard.meaning) {
			let newIndex = set.currentCardIndex + 1;
			if (newIndex >= set.cards.length) {
				newIndex = 0;
			}
			await setService.setNewCardIndex(newIndex);

			setCurrentCard(set?.cards[newIndex]);
			setSet((oldState) => ({
				...oldState,
				currentCardIndex: newIndex,
			}));
		}
	};

	const onShowCardMeaning = () => {
		setSet((oldState) => {
			const newCards = [...oldState.cards];
			newCards.splice(oldState.currentCardIndex + 3, 0, currentCard);
			return {
				...oldState,
				cards: newCards,
			};
		});
	};

	useEffect(() => {
		if (isFocused) {
			fetchData();
		}
	}, [isFocused]);

	// console.log('set', set)

	return (
		<Container source={{ uri: currentCard.imageUrl }}>
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
