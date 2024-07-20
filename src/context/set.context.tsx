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
	isLoadingAllSets: boolean;
};

const SetContext = createContext({} as SetContextType);

type Props = {
	children: React.ReactElement | React.ReactElement[];
};

export const SetProvider: React.FC<Props> = ({ children }) => {
	const [allSets, setAllSets] = useState(setService.localData.allSets);
	const [currentSet, setCurrentSet] = useState(setService.localData.currentSet);
	const [isLoadingAllSets, setIsLoadingAllSets] = useState(false);

	const DEFAULT_CARD: CardDTO = {
		id: null,
		term: '',
		meaning: '',
		meaningTip: '',
		termTip: '',
		setId: currentSet?.id,
	};

	async function getAllSets() {
		try {
			setIsLoadingAllSets(true);
			const sets = await setService.getAllSets();
			setAllSets(sets);
		} catch (error) {}
		setIsLoadingAllSets(false);
	}

	async function getSetInfo(setId: string) {
		try {
			await getSetFromStorage(setId);

			const set = await setService.getCurrentSetInfo(setId);
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
		const editedSetCards = currentSet?.cards;
		const index = editedSetCards.findIndex((c) => c.id === editedCard.id);
		const createdCard = await setService.addNewCard(editedCard);

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

	const getSetFromStorage = async (setId?: string) => {
		try {
			const storageSet = await setService.getSetFromStorage(setId);
			setCurrentSet(storageSet);
		} catch (error) {}
	};

	useEffect(() => {
		getAllSets();
	}, []);

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
				isLoadingAllSets,
			}}
		>
			{children}
		</SetContext.Provider>
	);
};

export const useSetContext = () => {
	return useContext(SetContext);
};
