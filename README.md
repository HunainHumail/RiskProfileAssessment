# Risk Profile Assessment App (RAKBANK)

A React Native mobile application for RAKBANK that helps users determine their investment risk profile through an intuitive questionnaire. The app supports English and Arabic languages, including full LTR and RTL layouts with localization using i18next.

## Table of Contents
- [Features](#features)
- [Bonus Features](#bonus-features)
- [Scoring Logic](#scoring-logic)
- [Directory Structure](#directory-structure)
- [Installation & Running the App](#installation--running-the-app)
- [Unit Testing & Code Coverage](#unit-testing--code-coverage)
- [Screenshots](#screenshots)

## Features
- Multi-language support (English and Arabic) with RTL and LTR layouts.
- Persistent questionnaire state: user answers are saved so they can continue where they left off after quitting the app.
- Smooth navigation flow across Welcome, Question, and Result screens.
- Dynamic risk calculation based on user responses.
- Native splash screen with react-native-bootsplash.

## Bonus Features
- Animated question transitions for a polished, smooth user experience.
- Results displayed with a speedometer component, visually representing the user's risk level.
- Full RTL support for Arabic language including mirroring UI components.
- State persistence ensuring no data loss if the user closes or quits the app mid-assessment.

## Scoring Logic
The risk profile score is calculated by summing the scores assigned to each selected answer. Based on the total score, the risk category and UI visuals are determined as follows:

| Total Score Range | Risk Category | Color          | Icon        |
|-------------------|---------------|----------------|-------------|
| 0 – 8             | Low Risk      | colors.riskLow | ShieldCheck |
| 9 – 12            | Medium Risk   | colors.riskMedium | (Default icon) |
| 13 and above      | High Risk     | colors.riskHigh | ShieldX     |

The app uses i18n translation keys to display the risk category label dynamically based on the selected language.

## Directory Structure
```
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/
│   ├── Header.tsx
│   ├── PrimaryButton.tsx
│   └── Speedometer.tsx
├── data/
│   └── questions.ts
├── i18n/
│   ├── locales/
│   └── index.ts
├── navigation/
│   ├── RootNavigator.tsx
│   └── types.ts
├── screens/
│   ├── QuestionScreen/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── ResultScreen/
│   └── WelcomeScreen/
├── stores/
│   └── useQuestionnaireStore.ts
└── utils/
    ├── theme/
    └── Images.ts
```

## Installation & Running the App

### Prerequisites
- Node.js (>=18 recommended)
- Yarn or npm
- React Native CLI
- Android Studio or Xcode (for Android and iOS simulators/emulators)
- Physical device or emulator/simulator for testing

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Run on Android:
   ```bash
   npx react-native run-android
   ```

4. Run on iOS:
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

## Unit Testing & Code Coverage
- Testing is done using `@testing-library/react-native` and `jest`.
- Mocking includes `AsyncStorage`, `i18n`, Zustand stores, and native splash screen module (`react-native-bootsplash`).
- Tests cover rendering, navigation flow, language changes including RTL handling, and persistent state behavior.
- Code coverage is approximately 90%+, surpassing the assignment requirement of 80%.

## Screenshots

### English
- Welcome screen with language toggle  
  ![Welcome Screen EN](https://github.com/username/repo-name/raw/main/screenshots/en/welcome.png)

- Animated question with selectable options  
  ![Question Screen EN](https://github.com/username/repo-name/raw/main/screenshots/en/question.png)

- Risk result displayed with speedometer and risk category  
  ![Result Screen EN](https://github.com/username/repo-name/raw/main/screenshots/en/result.png)

### Arabic
- Welcome screen with language toggle  
  ![Welcome Screen AR](https://github.com/username/repo-name/raw/main/screenshots/ar/welcome.png)

- Animated question with selectable options  
  ![Question Screen AR](https://github.com/username/repo-name/raw/main/screenshots/ar/question.png)

- Risk result displayed with speedometer and risk category  
  ![Result Screen AR](https://github.com/username/repo-name/raw/main/screenshots/ar/result.png)