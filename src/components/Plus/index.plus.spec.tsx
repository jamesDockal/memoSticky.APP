import { fireEvent, renderWithContext } from 'app/configs/render-with-context';
import { Plus } from './index.plus';

describe('Plus Component', () => {
	test('should render Plus Component with right attributes', () => {
		const { getByRole, getByTestId } = renderWithContext(<Plus />);

		expect(getByRole('button')).toBeTruthy();
		expect(getByTestId('plus-component')).toBeTruthy();
	});

	test('should call onPress prop on pressed', () => {
		const onPressStub = jest.fn((): null => null);

		const { getByTestId } = renderWithContext(<Plus onPress={onPressStub} />);

		const plusComponent = getByTestId('plus-component');
		fireEvent.press(plusComponent);

		expect(onPressStub).toBeCalledTimes(1);
	});
});
