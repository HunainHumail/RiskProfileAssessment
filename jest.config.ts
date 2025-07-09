import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|react-native-svg|react-native-reanimated)/)',
  ],
};

export default config;
