import React, { useRef, useState } from 'react';
import { Input } from '../Input/input.component';
import { Container } from './setCard.styles';
import { Dimensions, TextInput, View } from 'react-native';
import { Remove } from '../Remove/remove.component';
import { Card } from '../../dto/card.dto';

const windowWidth = Dimensions.get('window').width;

interface Props {
	handleSave: (item: Card) => void;
	item: Card;
}

export const SetCard: React.FC<Props> = ({ item, handleSave }) => {
	const [term, setTerm] = useState(item.term);
	const [meaning, setMeaning] = useState(item.meaning);

	const handleBur = () => {
		handleSave({ term, meaning, id: item.id });
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

				<Input
					label="Meaning"
					defaultValue={meaning}
					style={{
						marginTop: 16,
					}}
					onBlur={handleBur}
					onChangeText={setMeaning}
				/>
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
