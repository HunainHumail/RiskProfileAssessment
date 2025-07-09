import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ResultScreen from '@screens/ResultScreen';
import { useQuestionnaireStore } from '@stores/useQuestionnaireStore';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@stores/useQuestionnaireStore', () => ({
  useQuestionnaireStore: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, { total }: { total?: number } = {}) => {
      const translations: Record<string, string> = {
        'risk.low': 'Low Risk',
        'risk.medium': 'Medium Risk',
        'risk.high': 'High Risk',
        'result.title': 'Your Result',
        'result.retake': 'Retake Quiz',
      };
      
      if (key === 'result.score') {
        return `Total Score: ${total}`;
      }
      
      return translations[key] || key;
    },
  }),
}));

jest.mock('lucide-react-native', () => ({
  ShieldCheck: (props: any) => <test-icon data-testid="risk-icon" {...props} />,
  ShieldX: (props: any) => <test-icon data-testid="risk-icon" {...props} />,
}));

jest.mock('@components/Speedometer', () => (props: any) => (
  <test-speedometer testID="speedometer" {...props} />
));

jest.mock('@components/PrimaryButton', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return ({ label, onPress }: any) => (
    <TouchableOpacity testID="primary-button" onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
});

describe('ResultScreen', () => {
  const mockReset = jest.fn();
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    (useQuestionnaireStore as jest.Mock).mockImplementation((selector) => {
      return selector({
        answers: [],
        reset: mockReset,
      });
    });
    
    jest.spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderScreen = (totalScore = 0) => {
    (useQuestionnaireStore as jest.Mock).mockImplementation((selector) => {
      return selector({
        answers: Array(totalScore).fill({ selectedOptionScore: 1 }),
        reset: mockReset,
      });
    });
    
    return render(
      <NavigationContainer>
        <ResultScreen />
      </NavigationContainer>
    );
  };

  it('renders low risk UI when total <= 8', () => {
    renderScreen(5);
    
    expect(screen.getByText('Low Risk')).toBeTruthy();
    expect(screen.getByTestId('risk-icon')).toBeTruthy();
    expect(screen.getByText('Total Score: 5')).toBeTruthy();
  });

  it('renders medium risk UI when total > 8 and <= 12', () => {
    renderScreen(10);
    
    expect(screen.getByText('Medium Risk')).toBeTruthy();
    expect(screen.getByTestId('risk-icon')).toBeTruthy();
    expect(screen.getByText('Total Score: 10')).toBeTruthy();
  });

  it('renders high risk UI when total > 12', () => {
    renderScreen(15);
    
    expect(screen.getByText('High Risk')).toBeTruthy();
    expect(screen.getByTestId('risk-icon')).toBeTruthy();
    expect(screen.getByText('Total Score: 15')).toBeTruthy();
  });

  it('calls reset and navigates to Welcome when retake button is pressed', () => {
    renderScreen(5);
    
    fireEvent.press(screen.getByText('Retake Quiz'));
    
    expect(mockReset).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('Welcome');
  });
});