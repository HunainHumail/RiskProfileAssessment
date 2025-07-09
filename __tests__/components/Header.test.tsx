import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '@components/Header';

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
});
