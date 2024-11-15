import { Button, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HanziWriter, useHanziWriter } from '@jamsch/react-native-hanzi-writer';
import { useEffect, useState } from 'react';
import { CardDTO } from '../dto/set.dto';
import { useSetContext } from '../context/set.context';
import { setService } from '../factories';
import Checkbox from 'expo-checkbox';
import * as Speech from 'expo-speech';
import { router } from 'expo-router';

const Draw: React.FC = () => {
	const { currentSet, setCurrentSet, cardsRef } = useSetContext();

	const [currentCard, setCurrentCard] = useState<CardDTO>({} as CardDTO);
	const [charIndex, setCharIndex] = useState(0);
	const [writeMeaning, setWritingMeaning] = useState(false);
	const [showStrokes, setShowStrokes] = useState(false);

	const setNewCard = async () => {
		let index = currentSet?.currentCardIndex || 0;
		const newCard = currentSet.cards[index] || ({} as CardDTO);

		if (index >= currentSet.cards.length) {
			index = 0;
			await setService.setNewCardIndex(currentSet.id, 0);
		}

		const cardused: CardDTO = {
			id: newCard.id,
			setId: newCard.setId,
			imageUrl: newCard.imageUrl,

			term: writeMeaning ? newCard.meaning : newCard.term,
			termTip: writeMeaning ? newCard.meaningTip : newCard.termTip,
			meaning: writeMeaning ? newCard.term : newCard.meaning,
			meaningTip: writeMeaning ? newCard.termTip : newCard.meaningTip,
		};

		speakText(cardused.term);

		setCurrentCard(cardused);
	};

	const onChangeCheckbox = async (newValue: boolean) => {
		setWritingMeaning(newValue);
		await setService.setIsWritingMeaning(currentSet.id, newValue);
	};

	const speakText = (text: string) => {
		Speech.speak(text, {
			language: 'zh-CH',
		});
	};

	useEffect(() => {
		setNewCard();
	}, [writeMeaning, currentSet?.currentCardIndex]);

	const currentChar = currentCard?.term?.[charIndex];

	const writer = useHanziWriter({
		character: currentChar,
		loader(char) {
			return fetch(
				`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`
			).then((res) => res.json());
		},
	});
	writer.quiz.start({
		leniency: 0,
		quizStartStrokeNum: 0,
		showHintAfterMisses: 2,
		onComplete: async ({ totalMistakes }) => {
			if (charIndex === currentCard.term.length - 1) {
				console.log('dentro do if');
				setCharIndex(0);
				let newIndex = currentSet.currentCardIndex + 1;
				if (newIndex >= currentSet.cards.length) {
					newIndex = 0;
				}

				setCurrentSet((oldState) => ({
					...oldState,
					currentCardIndex: newIndex,
				}));
				await setService.setNewCardIndex(currentSet.id, newIndex);
			} else {
				setCharIndex((oldState) => oldState + 1);
				setShowStrokes(false);
			}
		},
		onCorrectStroke() {},
		onMistake(strokeData) {},
	});

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#282a36',
			}}
		>
			<View
				style={{
					justifyContent: 'center',
					flexDirection: 'row',
					gap: 12,
					marginTop: 16,
				}}
			>
				<Checkbox
					value={writeMeaning}
					onValueChange={onChangeCheckbox}
					color={writeMeaning ? 'green' : 'red'}
				/>
				<Text
					style={{
						color: writeMeaning ? 'green' : 'red',
					}}
				>
					{writeMeaning ? 'Escrever meaning' : 'Escrever term'}
				</Text>

				<Button
					title="show strokes"
					onPress={() => setShowStrokes(!showStrokes)}
				/>

				<Button
					title="scroll"
					onPress={() => {
						cardsRef?.current?.scrollToIndex({
							animated: true,
							index: currentSet.currentCardIndex,
						});
						router.navigate('');
					}}
				/>
			</View>

			<View
				style={{
					height: 350,
					marginTop: 32,
				}}
			>
				{writer && (
					<GestureHandlerRootView style={{ flex: 1 }}>
						<HanziWriter
							writer={writer}
							loading={<Text>Loading...</Text>}
							error={
								<View>
									<Text>Error loading character. </Text>
									<Button title="Refetch" onPress={writer.refetch} />
								</View>
							}
							style={{ alignSelf: 'center' }}
						>
							<HanziWriter.GridLines color="#00ff00" />
							<HanziWriter.Svg>
								{showStrokes && <HanziWriter.Outline color="#888" />}

								{/* <HanziWriter.Character color="#0000ff" radicalColor="puple" /> */}
								<HanziWriter.QuizStrokes color="#f0f" />
								<HanziWriter.QuizMistakeHighlighter
									color="#00f0f0"
									strokeDuration={400}
								/>
							</HanziWriter.Svg>
						</HanziWriter>
					</GestureHandlerRootView>
				)}
			</View>

			<View
				style={{
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 36,
						color: 'white',
					}}
				>
					{currentCard.meaning}
				</Text>
			</View>
		</View>
	);
};

export default Draw;
