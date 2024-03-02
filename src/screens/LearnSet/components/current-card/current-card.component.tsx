import React, { useEffect, useState } from 'react';
import { Content, Meaning, Term, WriteMeaning } from './current-card.styles';
import { Input } from '../../../../components/Input/input.component';
import { CardDTO } from '../../../../dto/set.dto';
import { View } from 'react-native';
import { setService } from '../../../../factories';
import { mockSetKey } from '../../../../mock';

interface Props {
	card: CardDTO;
	onWriteMeaning: (value: string) => void;
}

export const CurrentCard: React.FC<Props> = ({ card, onWriteMeaning }) => {
	const [meaning, setMeaning] = useState('');
	const [showMeaning, setShowMeaning] = useState(false);

	const showCardMeaning = () => {
		setShowMeaning(true);
	};

	useEffect(() => {
		setMeaning('');
		setShowMeaning(false);
	}, [card]);

	return (
		<Content>
			<Term>{card.term}</Term>
			{showMeaning && <Meaning>{card.meaning}</Meaning>}
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
				/>
			</View>
		</Content>
	);
};
