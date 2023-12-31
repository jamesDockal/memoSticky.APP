import React, { useState } from 'react';
import { Content, Term, WriteMeaning } from './current-card.styles';
import { Input } from '../../../../components/Input/input.component';
import { Card } from '../../../../dto/set.dto';
import { View } from 'react-native';

interface Props {
	card: Card;
}

export const CurrentCard: React.FC<Props> = ({ card }) => {
	const onChangeInput = (text) => {};

	return (
		<Content>
			<Term>{card.term}</Term>
			{/* <Value>China</Value> */}
			<View
				style={{
					width: '100%',
				}}
			>
				<WriteMeaning
					onChangeText={onChangeInput}
					themeType="light"
					style={{
						textAlign: 'center',
					}}
				/>
			</View>
		</Content>
	);
};
