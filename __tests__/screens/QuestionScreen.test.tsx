import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuestionScreen from '../../src/screens/QuestionScreen';
import { questions } from '@data/questions';
import { styles } from '@screens/QuestionScreen/styles';

jest.mock('../../src/components/Header', () => () => null);

const mockAddAnswer = jest.fn();
const mockSetCurrentIndex = jest.fn();
const mockNavigate = jest.fn();
const mockCanGoBack = jest.fn(() => false);
const mockGoBack = jest.fn();
const mockReset = jest.fn();

jest.mock('../../src/components/Header', () => (props: any) => {
    const { Text, TouchableOpacity } = require('react-native');
    return (
        <TouchableOpacity testID="header-back-button" onPress={props.onBack}>
            <Text>Back</Text>
        </TouchableOpacity>
    );
});

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
        canGoBack: mockCanGoBack,
        goBack: mockGoBack,
        reset: mockReset,
    }),
}));

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

    it('Continue button is disabled if localSelected is null', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 0,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        const continueButton = getByTestId('continue-button');
        expect(continueButton.props.accessibilityState?.disabled).toBeTruthy();
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

    it('navigates to Result on continue if currentIndex is last question', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');

        // Mock answers so selectedAnswer is not null and localSelected initializes properly
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [{ questionId: questions[questions.length - 1].id, selectedOptionScore: 1 }],
            addAnswer: mockAddAnswer,
            currentIndex: questions.length - 1,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);

        // localSelected initialized to 1, so no need to press option; directly press continue
        fireEvent.press(getByTestId('continue-button'));

        expect(mockAddAnswer).toHaveBeenCalledWith(questions[questions.length - 1].id, 1);
        expect(mockSetCurrentIndex).not.toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('Result');
    });

    it('handleBack calls navigation.goBack when currentIndex is 0 and canGoBack is true', () => {
        mockCanGoBack.mockReturnValue(true);
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 0,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('header-back-button'));

        expect(mockGoBack).toHaveBeenCalled();
    });

    it('handleBack calls navigation.reset when currentIndex is 0 and canGoBack is false', () => {
        mockCanGoBack.mockReturnValue(false);
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 0,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('header-back-button'));

        expect(mockReset).toHaveBeenCalledWith({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    });

    it('handleBack calls setCurrentIndex when currentIndex > 0', () => {
        const useQuestionnaireStore = require('../../src/stores/useQuestionnaireStore');
        useQuestionnaireStore.useQuestionnaireStore.mockReturnValueOnce({
            answers: [],
            addAnswer: mockAddAnswer,
            currentIndex: 2,
            setCurrentIndex: mockSetCurrentIndex,
        });

        const { getByTestId } = render(<QuestionScreen />);
        fireEvent.press(getByTestId('header-back-button'));

        expect(mockSetCurrentIndex).toHaveBeenCalledWith(1);
    });



});
