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
		const result = (await setService.fetch(mockSetKey)) || ({} as SetDTO);
		setSet(result);
		if (result?.cards) {
			setCurrentCard(result?.cards[result.currentCardIndex]);
		}
	};

	const onWriteMeaning = async (text) => {
		if (text === currentCard.meaning) {
			const newIndex = await setService.setNewCardIndex(
				mockSetKey,
				set.currentCardIndex + 1
			);

			setCurrentCard(set?.cards[newIndex]);
			setSet((oldState) => ({
				...oldState,
				currentCardIndex: newIndex,
			}));
		}
	};

	useEffect(() => {
		if (isFocused) {
			fetchData();
		}
	}, [isFocused]);

	return (
		<Container
			source={{ uri: 'a' }}
			// source={{
			// 	uri: 'https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg',
			// }}
		>
			<CardContainer>
				<OpacityBackground />
				{currentCard?.id && (
					<CurrentCard card={currentCard} onWriteMeaning={onWriteMeaning} />
				)}
			</CardContainer>
		</Container>
	);
};
