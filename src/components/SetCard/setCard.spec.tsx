import { renderWithContext } from 'app/configs/render-with-context';
import { SetCard } from './setCard.component';

jest.mock();

describe('SetCard Component', () => {
	test('should render with the right labels', () => {
		const { getByText } = renderWithContext(<SetCard />);

		expect(getByText('Term')).toBeTruthy();
		expect(getByText('Meaning')).toBeTruthy();
	});
});
