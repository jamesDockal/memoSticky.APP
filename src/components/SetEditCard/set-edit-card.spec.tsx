import { renderWithContext } from 'app/configs/render-with-context';
import { SetEditCard } from './set-edit-card.component';

jest.mock();

describe('SetCard Component', () => {
	test('should render with the right labels', () => {
		const { getByText } = renderWithContext(<SetEditCard />);

		expect(getByText('Term')).toBeTruthy();
		expect(getByText('Meaning')).toBeTruthy();
	});
});
