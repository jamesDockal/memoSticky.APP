import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { setService } from '../factories';
import { CardDTO, SetDTO, SetModel } from '../dto/set.dto';

type SetContextType = {
	allSets: SetModel[];
	currentSet: SetDTO;
	setCurrentSet: any;
	getSetInfo: (setId: string) => Promise<SetDTO>;
	addEmptyCard: () => void;
	deleteCard: (card: CardDTO) => void;
	handleSaveCard: (editedCard: CardDTO) => void;
};

const SetContext = createContext({} as SetContextType);

type Props = {
	children: React.ReactElement | React.ReactElement[];
};

export const SetProvider: React.FC<Props> = ({ children }) => {
	const [allSets, setAllSets] = useState([]);
	const [currentSet, setCurrentSet] = useState({} as SetDTO);

	const DEFAULT_CARD: CardDTO = {
		id: null,
		term: '',
		meaning: '',
		meaningTip: '',
		termTip: '',
		setId: currentSet?.id,
	};

	const DEFAULT_SET: SetDTO = {
		id: '',
		name: 'name',
		currentCardIndex: 0,
		cards: [DEFAULT_CARD],
	};

	async function getAllSets() {
		try {
			const sets = await setService.getAllSets();
			console.log('sets', sets)
			setAllSets(sets);

			await getSetInfo(sets[0]?.id);
		} catch (error) {
			console.log('getAllSets error', error);
		}
	}

	async function getSetInfo(setId: string) {
		try {
			const set = await setService.getSetInfo(setId);
			setCurrentSet(set);
			return set;
		} catch (error) {}
	}

	async function addEmptyCard() {
		setCurrentSet((oldState) => ({
			...oldState,
			cards: [...oldState.cards, DEFAULT_CARD],
		}));
	}

	async function deleteCard(card: CardDTO) {
		if (card.id) {
			await setService.deleteCard(card.id);
		}

		setCurrentSet((oldState) => {
			let newCards = [...oldState.cards];

			newCards = newCards.filter((c) => c.id !== card.id);
			return {
				...oldState,
				cards: newCards,
			};
		});
	}

	const handleSaveCard = async (editedCard: CardDTO) => {
		console.log('editedCard', editedCard);
		const editedSetCards = currentSet?.cards;
		const index = editedSetCards.findIndex((c) => c.id === editedCard.id);
		const createdCard = await setService.addNewCard(editedCard);
		console.log('createdCard', createdCard);

		editedSetCards[index] = {
			...editedCard,
			id: editedCard.id || createdCard.id,
		};

		setCurrentSet((oldState) => ({
			...oldState,
			cards: editedSetCards,
		}));

		const removedEmpty = editedSetCards.filter(
			(card) => card.meaning && card.term
		);

		// await setService.saveProperty(
		// 	setService.localStorageKey,
		// 	'cards',
		// 	removedEmpty
		// );
	};

	useEffect(() => {
		getAllSets();
	}, []);

	console.log('currentSet', currentSet);

	return (
		<SetContext.Provider
			value={{
				allSets,
				currentSet,
				setCurrentSet,
				getSetInfo,
				addEmptyCard,
				deleteCard,
				handleSaveCard,
			}}
		>
			{children}
		</SetContext.Provider>
	);
};

export const useSetContext = () => {
	return useContext(SetContext);
};
