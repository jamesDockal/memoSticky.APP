import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { SetEditCard } from '../../components/SetEditCard/set-edit-card.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './edit-set.styles';
import { CardDTO, SetDTO } from '../../dto/set.dto';
import { setService } from '../../factories';
import { mockSetKey } from '../../mock';
import { useIsFocused } from '@react-navigation/native';
import { Input } from '../../components/Input/input.component';
import { useSetContext } from '../../context/set.context';

export const EditSet: React.FC = () => {
	const isFocused = useIsFocused();
	const { currentSet, getSetInfo, addEmptyCard, deleteCard, handleSaveCard } =
		useSetContext();

	const [isLoading, setIsLoading] = useState(false);
	const [filterText, setFilterText] = useState('');

	const fetchData = async () => {
		setIsLoading(true);
		await getSetInfo(currentSet?.id);
		setIsLoading(false);
	};

	const onPlusButtonPress = (): void => {
		addEmptyCard();
	};

	const handleDelete = (card: CardDTO) => {
		deleteCard(card);
	};

	useEffect(() => {
		if (isFocused && currentSet?.id) {
			fetchData();
		}
	}, [isFocused]);

	const filteredCards = (currentSet?.cards || []).filter((card) => {
		if (!filterText) {
			return true;
		}

		const keys = [
			card.term,
			card.termTip,
			card.meaning,
			card.meaningTip,
		].filter((key) => key);

		return keys.some((value: string) => {
			return value.toString().includes(filterText);
		});
	});

	return (
		<Container>
			<View
				style={{
					width: '100%',
					padding: 16,
				}}
			>
				<Input label="Search" onChangeText={setFilterText} value={filterText} />
			</View>

			{isLoading && (
				<View
					style={{
						alignSelf: 'flex-start',
					}}
				>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			)}

			<FlatList
				data={filteredCards}
				renderItem={({ item, index }) => (
					<SetEditCard
						key={item.id}
						card={item}
						handleSave={handleSaveCard}
						handleDelete={handleDelete}
					/>
				)}
			/>

			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
