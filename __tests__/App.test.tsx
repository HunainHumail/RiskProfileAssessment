import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import App from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../src/i18n';
import { I18nManager } from 'react-native';


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

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

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

  it('calls forceRTL(true) if saved language is Arabic and current RTL is false', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('ar');
    (i18n.changeLanguage as jest.Mock).mockResolvedValue();

    const forceRTLSpy = jest.spyOn(I18nManager, 'forceRTL').mockImplementation(() => { });

    render(<App />);

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(forceRTLSpy).toHaveBeenCalledWith(true);

    forceRTLSpy.mockRestore();
  });

  it('does not call forceRTL if RTL status matches saved language', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('ar');
    (i18n.changeLanguage as jest.Mock).mockResolvedValue();

    // Save original isRTL
    const originalIsRTL = Object.getOwnPropertyDescriptor(I18nManager, 'isRTL');

    // Override isRTL to true
    Object.defineProperty(I18nManager, 'isRTL', {
      configurable: true,
      get: () => true,
    });

    const forceRTLSpy = jest.spyOn(I18nManager, 'forceRTL').mockImplementation(() => { });

    render(<App />);

    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(forceRTLSpy).not.toHaveBeenCalled();

    // Restore original isRTL
    if (originalIsRTL) {
      Object.defineProperty(I18nManager, 'isRTL', originalIsRTL);
    }

    forceRTLSpy.mockRestore();
  });

});