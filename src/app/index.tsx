import React, { useRef, useState } from 'react';
import { useSetContext } from '../context/set.context';
import { CardDTO } from '../dto/set.dto';
import { ActivityIndicator, Button, FlatList, View } from 'react-native';
import { Input } from '../components/Input/input.component';
import { SetEditCard } from '../components/SetEditCard/set-edit-card.component';
import { Plus } from '../components/Plus/plus.component';
import { router } from 'expo-router';
import { Container } from '../styles/edit-set.page.styles';

const EditSet: React.FC = () => {
	const {
		currentSet,
		addEmptyCard,
		deleteCard,
		handleSaveCard,
		isLoadingAllSets,
		cardsRef,
	} = useSetContext();

	const [filterText, setFilterText] = useState('');

	const onPlusButtonPress = (): void => {
		cardsRef.current.scrollToEnd();
		addEmptyCard();
	};

	const handleDelete = (card: CardDTO) => {
		deleteCard(card);
	};

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
			return value.toString().toLowerCase().includes(filterText.toLowerCase());
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
			{isLoadingAllSets && (
				<View
					style={{
						alignSelf: 'flex-start',
					}}
				>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			)}
			<FlatList
				ref={cardsRef}
				data={filteredCards}
				removeClippedSubviews={false}
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

export default EditSet;
