import React, { useRef, useState } from 'react';
import { useSetContext } from '../src/context/set.context';
import { CardDTO } from '../src/dto/set.dto';
import { Container } from '../src/screens/EditSet/edit-set.styles';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Input } from '../src/components/Input/input.component';
import { SetEditCard } from '../src/components/SetEditCard/set-edit-card.component';
import { Plus } from '../src/components/Plus/plus.component';

const EditSet: React.FC = () => {
	const {
		currentSet,
		addEmptyCard,
		deleteCard,
		handleSaveCard,
		isLoadingAllSets,
	} = useSetContext();

	const [filterText, setFilterText] = useState('');
	const cardsRef = useRef(null);

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
