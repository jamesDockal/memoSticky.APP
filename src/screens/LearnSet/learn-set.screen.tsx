import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
	Container,
	CardContainer,
	OpacityBackground,
} from './learn-set.styles';
import { Input } from '../../components/Input/input.component';
import { CurrentCard } from './components/current-card/current-card.component';
import { Card, Set } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';
import { useIsFocused } from '@react-navigation/native';

export const LearnSet: React.FC = () => {
	const isFocused = useIsFocused();

	const [set, setSet] = useState<Set>({} as Set);
	const [currentCard, setCurrentCard] = useState<Card>({} as Card);

	const fetchData = async () => {
		const result = await setService.fetch(mockSetKey);
		setSet(result || ({} as Set));
		setCurrentCard(result.cards[result.currentCardIndex]);
	};

	useEffect(() => {
		if (isFocused) {
			fetchData();
		}
	}, [isFocused]);

	return (
		<Container
			source={{
				uri: 'https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg',
			}}
		>
			<CardContainer>
				<OpacityBackground />
				<CurrentCard card={currentCard} />
			</CardContainer>
		</Container>
	);
};
