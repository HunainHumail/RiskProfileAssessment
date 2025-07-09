import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../../src/components/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders with correct label', () => {
    const { getByText } = render(<PrimaryButton label="Click me" onPress={() => {}} />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<PrimaryButton label="Press" onPress={onPressMock} />);
    fireEvent.press(getByTestId('continue-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<PrimaryButton label="Press" onPress={onPressMock} disabled />);
    const button = getByTestId('continue-button');
    expect(button.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
