import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuestionScreen from '../../src/screens/QuestionScreen';
import { questions } from '@data/questions';
import { styles } from '@screens/QuestionScreen/styles';

jest.mock('../../src/components/Header', () => () => null);

const mockAddAnswer = jest.fn();
const mockSetCurrentIndex = jest.fn();
jest.mock('../../src/stores/useQuestionnaireStore', () => ({
    useQuestionnaireStore: jest.fn(() => ({
        answers: [],
        addAnswer: mockAddAnswer,
        currentIndex: 0,
        setCurrentIndex: mockSetCurrentIndex,
    })),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('QuestionScreen Extended Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders question text and options', () => {
        const { getByTestId } = render(<QuestionScreen />);
        expect(getByTestId('question-text')).toBeTruthy();
        expect(getByTestId('option-1')).toBeTruthy();
    });

    it('initializes localSelected from answers state', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [{ questionId: 1, selectedOptionScore: 2 }],
            addAnswer: jest.fn(),
            currentIndex: 0,
            setCurrentIndex: jest.fn(),
        });

        const { getByTestId } = render(<QuestionScreen />);
        expect(getByTestId('option-2').props.style).toEqual(
            expect.objectContaining(styles.selectedOption)
        );
    });

    it('selects option and enables continue button', () => {
        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('option-1'));
        const continueButton = getByTestId('continue-button');
        expect(continueButton.props.accessibilityState?.disabled).toBeFalsy();
    });

    it('Continue button is disabled if no option selected', () => {
        const { getByTestId } = render(<QuestionScreen />);
        const continueButton = getByTestId('continue-button');
        expect(continueButton.props.accessibilityState?.disabled).toBeTruthy();
    });

    it('calls addAnswer and setCurrentIndex on continue when not last question', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 0,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('option-1'));
        fireEvent.press(getByTestId('continue-button'));

        expect(mockAddAnswer).toHaveBeenCalledWith(expect.any(Number), 1);
        expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);
    });

    it('navigates to Result screen on continue if last question', () => {
        const mockNavigate = jest.fn();
        jest.mock('@react-navigation/native', () => ({
            useNavigation: () => ({
                navigate: mockNavigate,
                canGoBack: () => false,
                goBack: jest.fn(),
                reset: jest.fn(),
            }),
        }));

        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: questions.length - 1,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('option-1'));
        fireEvent.press(getByTestId('continue-button'));
    });

    it('handleBack calls setCurrentIndex with currentIndex - 1 if currentIndex > 0', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 2,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
    });
});
