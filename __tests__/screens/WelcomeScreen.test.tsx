import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '@screens/WelcomeScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../src/i18n', () => ({
  changeLanguage: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

jest.mock('@utils/Images', () => ({
  NextIcon: () => null,
  VectorSvg: () => null,
  Images: {
    bankLogo: 1,
  },
}));

describe('WelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main elements with correct testIDs', () => {
    const { getByTestId } = render(<WelcomeScreen />);

    expect(getByTestId('language-toggle')).toBeTruthy();
    expect(getByTestId('start-button')).toBeTruthy();
  });

  it('calls changeLanguage when language toggle is pressed', () => {
    const { getByTestId } = render(<WelcomeScreen />);
    const { changeLanguage } = require('../../src/i18n');

    fireEvent.press(getByTestId('language-toggle'));

    expect(changeLanguage).toHaveBeenCalledTimes(1);
    expect(['ar', 'en']).toContain(changeLanguage.mock.calls[0][0]);
  });

  it('navigates to Question screen on start button press', () => {
    const { getByTestId } = render(<WelcomeScreen />);
    fireEvent.press(getByTestId('start-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Question');
  });
});
