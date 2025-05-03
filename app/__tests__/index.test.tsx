import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, screen, RenderAPI } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';

import { onboarding_screens } from '@/constants/constants';

import Index from '../index';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});

const mockNavigate = jest.fn();
beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });
});

// Render the component with providers
const renderWithProviders = () =>
  render(
    <NavigationContainer>
      <Index />
    </NavigationContainer>
  );

const allDescElements = (screen: RenderAPI) => {
  // Get all kinds of Lorem Ipsum Content
  return screen.getAllByText(onboarding_screens[0].desc);
};

describe('Index (Onboarding) Screen', () => {
  it('renders first onboarding screen', async () => {
    renderWithProviders();

    expect(screen.getByText(onboarding_screens[0].title)).toBeOnTheScreen();
    expect(allDescElements(screen)[0]).toHaveTextContent(onboarding_screens[0].desc);
    expect(screen.getByText('Next')).toBeOnTheScreen();
  });

  it('renders second onboarding screen', () => {
    renderWithProviders();

    const button = screen.getByLabelText('onboardingTextButton');

    fireEvent.press(button);

    expect(screen.getByText(onboarding_screens[1].title)).toBeOnTheScreen();
    expect(allDescElements(screen)[1]).toHaveTextContent(onboarding_screens[1].desc);
    expect(screen.getByText('Next')).toBeOnTheScreen();
  });

  it('render third onboarding screen and navigates to homescreen on last press', async () => {
    renderWithProviders();
    const button = screen.getByLabelText('onboardingTextButton');

    for (let i = 0; i < onboarding_screens.length; i++) {
      fireEvent.press(button);

      if (i === onboarding_screens.length) {
        expect(screen.getByText(onboarding_screens[2].title)).toBeOnTheScreen();
        expect(allDescElements(screen)[2]).toHaveTextContent(onboarding_screens[2].desc);
        expect(screen.getByText(`Let's Go`)).toBeOnTheScreen();
      }
    }

    expect(mockNavigate).toHaveBeenCalledWith('/homescreen');
  });
});
