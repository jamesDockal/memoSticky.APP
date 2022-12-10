/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	setupFiles: ['<rootDir>/src/test/setup.ts'],

	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
	],
	moduleNameMapper: {
		'^app/(.*)$': '<rootDir>/src/$1',
	},
};
