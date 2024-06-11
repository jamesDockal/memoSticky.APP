import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../Input/input.component';
import { Content, MainPart, Row, TipPart } from './set-edit-card.styles';
import { Keyboard, View } from 'react-native';
import { CardDTO } from '../../dto/set.dto';
import { Remove } from '../Remove/remove.component';

interface Props {
	handleSave: (item: CardDTO) => void;
	handleDelete: (item: CardDTO) => void;
	card: CardDTO;
}

export const SetEditCard: React.FC<Props> = ({
	card,
	handleSave,
	handleDelete,
}) => {
	const [term, setTerm] = useState(card.term);
	const [meaning, setMeaning] = useState(card.meaning);
	const [termTip, setTermTip] = useState(card.termTip);
	const [meaningTip, setMeaningTip] = useState(card.meaningTip);

	const handleBur = () => {
		handleSave({
			term,
			meaning,
			id: card.id,
			meaningTip,
			termTip,
			setId: card.setId,
		});
	};

	return (
		<View
			style={{
				width: '100%',
				height: 200,
				position: 'relative',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				padding: 16,
				gap: 12,
			}}
		>
			<Remove onPress={() => handleDelete(card)} />

			<Content testID="set-card">
				<Row>
					<MainPart>
						<Input
							label="Term"
							defaultValue={term}
							onBlur={handleBur}
							onChangeText={setTerm}
							blurOnSubmit={false}
						/>
					</MainPart>

					<TipPart>
						<Input
							label="Term Tip"
							defaultValue={termTip}
							onBlur={handleBur}
							onChangeText={setTermTip}
							blurOnSubmit={false}
						/>
					</TipPart>
				</Row>

				<Row>
					<MainPart>
						<Input
							label="Meaning"
							defaultValue={meaning}
							onBlur={handleBur}
							onChangeText={setMeaning}
							blurOnSubmit={false}
						/>
					</MainPart>

					<TipPart>
						<Input
							label="Meaning Tip"
							defaultValue={meaningTip}
							onBlur={handleBur}
							onChangeText={setMeaningTip}
							blurOnSubmit={false}
						/>
					</TipPart>
				</Row>
			</Content>
		</View>
	);
};
