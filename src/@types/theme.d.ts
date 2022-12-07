import 'styled-components';
import { darkTheme } from '../styles/theme';

type CustomTheme = typeof darkTheme;

declare module 'styled-components' {
	export interface DefaultTheme extends CustomTheme {}
}
