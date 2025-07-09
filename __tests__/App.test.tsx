import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import App from '../App';


const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('An update to App inside a test was not wrapped in act')
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

jest.mock('../src/stores/useQuestionnaireStore', () => ({
  useQuestionnaireStore: jest.fn(() => ({
    hasHydrated: true,
    setHasHydrated: jest.fn(),
    answers: [],
    currentIndex: 0,
    addAnswer: jest.fn(),
    setCurrentIndex: jest.fn(),
    reset: jest.fn(),
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('en')),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/i18n', () => ({
  changeLanguage: jest.fn(() => Promise.resolve()),
}));

jest.mock('../src/navigation/RootNavigator', () => () => null);

global.setImmediate = (callback: (...args: any[]) => void, ...args: any[]) =>
  setTimeout(callback, 0, ...args);


describe('App', () => {
  it('renders loading indicator initially', () => {
    render(<App />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('removes loading indicator after setupLanguage runs', async () => {
    render(<App />);

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(screen.queryByTestId('loading-indicator')).toBeNull();
  });
});