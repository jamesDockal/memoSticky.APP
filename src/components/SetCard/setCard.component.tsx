import React, { useRef } from 'react';
import { Input } from '../Input/input.component';
import { Container } from './setCard.styles';
import { Dimensions, View } from 'react-native';
import { Remove } from '../Remove/remove.component';

const windowWidth = Dimensions.get('window').width;

interface Props {
	handleSave: (item: any, index: number) => void
	index: number
	item: {
		term: string;
		meaning: string;
	};
}

export const SetCard: React.FC<Props> = ({ item,handleSave,index }) => {
	const refTerm = useRef()


	const handleBur = ()  => {
		// handleSave()
	}


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
				<Input label="Term" defaultValue={item.term} 
					onBlur={handleBur}
					ref={refTerm}
				/>

				<Input
					label="Meaning"
					defaultValue={item.meaning}
					style={{
						marginTop: 16,
					}}
					onBlur={handleBur}
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
