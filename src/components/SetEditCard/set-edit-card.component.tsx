import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../Input/input.component';
import { Container } from './set-edit-card.styles';
import { Keyboard, View } from 'react-native';
import { CardDTO } from '../../dto/set.dto';

interface Props {
	handleSave: (item: CardDTO) => void;
	card: CardDTO;
}

export const SetEditCard: React.FC<Props> = ({ card, handleSave }) => {
	const [term, setTerm] = useState(card.term);
	const [meaning, setMeaning] = useState(card.meaning);

	const handleBur = () => {
		handleSave({ term, meaning, id: card.id });
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
			}}
		>
			<Container testID="set-card">
				<Input
					label="Term"
					defaultValue={term}
					onBlur={handleBur}
					onChangeText={setTerm}
				/>

				<View
					style={{
						marginTop: 16,
					}}
				>
					<Input
						label="Meaning"
						defaultValue={meaning}
						onBlur={handleBur}
						onChangeText={setMeaning}
					/>
				</View>
			</Container>

			{/* <Remove
				style={{
					position: 'absolute',
					left: '70%',
					zIndex: 0,
				}}
			></Remove> */}
		</View>
	);
};
