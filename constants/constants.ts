export type OnboardingScreensType = {
  id: number;
  image: any;
  title: string;
  desc: string;
};

export type MovieDetailsType = {
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: string;
  id: number;
};

export const onboarding_screens: OnboardingScreensType[] = [
  {
    id: 1,
    image: require('@/assets/images/splash_1.png'),
    title: 'Watch Movies',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.',
  },
  {
    id: 2,
    image: require('@/assets/images/splash_2.png'),
    title: 'Search Movies',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.',
  },
  {
    id: 3,
    image: require('@/assets/images/splash_3.png'),
    title: 'Download Movies',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.',
  },
];
