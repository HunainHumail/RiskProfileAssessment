import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '@components/Header';
import { I18nManager } from 'react-native';

jest.mock('@assets/icons/next-icon.svg', () => {
  return () => null;
});

describe('Header', () => {
  it('renders back button and calls onBack when pressed', () => {
    const onBackMock = jest.fn();
    const { getByTestId } = render(<Header onBack={onBackMock} />);
    fireEvent.press(getByTestId('header-back-button'));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('applies scaleX = 1 when isRTL is true', () => {
    // Backup original descriptor
    const originalIsRTL = Object.getOwnPropertyDescriptor(I18nManager, 'isRTL');

    // Override isRTL to true
    Object.defineProperty(I18nManager, 'isRTL', {
      configurable: true,
      get: () => true,
    });

    const { getByTestId } = render(<Header onBack={() => { }} />);
    const icon = getByTestId('header-back-button').children[0];
    expect(icon.props.style.transform).toEqual([{ scaleX: 1 }]);

    // Restore original isRTL
    if (originalIsRTL) {
      Object.defineProperty(I18nManager, 'isRTL', originalIsRTL);
    }
  });

  it('applies scaleX = -1 when isRTL is false', () => {
    const originalIsRTL = Object.getOwnPropertyDescriptor(I18nManager, 'isRTL');

    Object.defineProperty(I18nManager, 'isRTL', {
      configurable: true,
      get: () => false,
    });

    const { getByTestId } = render(<Header onBack={() => {}} />);
    const icon = getByTestId('header-back-button').children[0];
    expect(icon.props.style.transform).toEqual([{ scaleX: -1 }]);

    if (originalIsRTL) {
      Object.defineProperty(I18nManager, 'isRTL', originalIsRTL);
    }
  });
});
