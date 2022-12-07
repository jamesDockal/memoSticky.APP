import { renderWithContext } from 'app/configs/render-with-context';
import { EditSet } from './index.editSet';

describe('EditSet Screen', () => {
	test('should the required components', async () => {
		const { getByTestId } = renderWithContext(<EditSet />);

		const cardComponent = getByTestId('set-card');
		const addCardComponent = getByTestId('add-set-card');

		expect(cardComponent).toBeTruthy();
		expect(addCardComponent).toBeTruthy();
	});
});
