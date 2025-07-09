import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Mock react-navigation to avoid errors during testing
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      canGoBack: () => true,
    }),
  };
});

// Mock async-storage to avoid native module errors in tests
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaView: ({ children }: any) => children,
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});
