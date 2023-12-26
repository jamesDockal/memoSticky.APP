import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { SetCard } from '../../components/SetCard/setCard.component';
import { Plus } from '../../components/Plus/plus.component';

import { Container } from './editSet.styles';
// const storage = new MMKV({id: 'test'})

export const EditSet: React.FC = () => {
	const [setCards, setSetCards] = useState([
		{
			id: 1,
			term: 'teste',
			meaning: '2asd3asdas1',
		},
	]);

	const handleSave = (data, index) => {
		// storage.set('set', JSON.stringify([data]))
		fetchData()

	}

	const fetchData = () => {
		// const data = storage.getString('set')
		// console.log('data', data)
		// setSetCards(data)
	}

	useEffect(() => {
		fetchData()
	}, [])
	



	const onPlusButtonPress = (): void => {
		setSetCards((oldState) => [
			...oldState,
			{
				id: oldState[oldState.length - 1].id + 1,
			},
		]);
	};

	return (
		<Container>
			{/* <GestureHandlerRootView> */}
			<FlatList
				data={setCards}
				renderItem={({ item, index }) => <SetCard key={item.id} item={item}
					index={index}
					handleSave={handleSave}
				/>}
			/>
			{/* </GestureHandlerRootView> */}

			<Plus onPress={onPlusButtonPress} />
		</Container>
	);
};
