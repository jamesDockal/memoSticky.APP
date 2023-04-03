import { fireEvent, renderWithContext } from 'app/configs/render-with-context';
import React from 'react';
import { EditSet } from './editSet.screen';

describe('EditSet Screen', () => {
	test('should the required components', async () => {
		const { getByTestId } = renderWithContext(<EditSet />);

		const cardComponent = getByTestId('set-card');
		const addCardComponent = getByTestId('plus-component');

		expect(cardComponent).toBeTruthy();
		expect(addCardComponent).toBeTruthy();
	});

	test('should add SetCard on Plus Component click ', async () => {
		const { getByTestId, getAllByTestId } = renderWithContext(<EditSet />);

		let cardsComponent = getAllByTestId('set-card');
		expect(cardsComponent.length).toBe(1);

		const addCardComponent = getByTestId('plus-component');

		fireEvent.press(addCardComponent);

		cardsComponent = getAllByTestId('set-card');
		expect(cardsComponent.length).toBe(2);
	});
});
