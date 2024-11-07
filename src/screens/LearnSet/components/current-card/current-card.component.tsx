import React, { useEffect, useState } from 'react';
import {
	Content,
	Meaning,
	MeaningBox,
	MeaningTip,
	Term,
	TermTip,
	WriteMeaning,
} from './current-card.styles';
import { CardDTO } from '../../../../dto/set.dto';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
	card: CardDTO;
	onWriteMeaning: (value: string) => void;
	onShowCardMeaning: () => void;
}

export const CurrentCard: React.FC<Props> = ({
	card,
	onWriteMeaning,
	onShowCardMeaning,
}) => {
	const [meaning, setMeaning] = useState('');
	const [showMeaning, setShowMeaning] = useState(false);

	const showCardMeaning = () => {
		if (!showMeaning) {
			setShowMeaning(true);
			onShowCardMeaning();
		}
	};

	useEffect(() => {
		setMeaning('');
		setShowMeaning(false);
	}, [card.id]);

	return (
		<Content>
			<TouchableOpacity
				style={{
					backgroundColor: 'white',
				}}
				accessibilityRole="button"
				onPress={() => {
					showCardMeaning();
				}}
			>
				<Text>submit</Text>
			</TouchableOpacity>
			<Text>EXPO_PUBLIC_API_URL: {process.env.EXPO_PUBLIC_API_URL}</Text>

			<Term>{card.term}</Term>

			{card.termTip && <TermTip>{card.termTip}</TermTip>}

			{showMeaning && (
				<MeaningBox>
					<Meaning>{card.meaning}</Meaning>
					{card.meaningTip && <MeaningTip>{card.meaningTip}</MeaningTip>}
				</MeaningBox>
			)}

			<View
				style={{
					width: '100%',
				}}
			>
				<WriteMeaning
					value={meaning}
					onChangeText={(text) => {
						onWriteMeaning(text);
						setMeaning(text);
					}}
					themeType="light"
					style={{
						textAlign: 'center',
					}}
					onSubmitEditing={showCardMeaning}
					blurOnSubmit={false}
				/>
			</View>
		</Content>
	);
};
