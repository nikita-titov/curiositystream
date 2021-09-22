// Default Screen width
export const DEFAULT_SCREEN_WIDTH = 375;

// Slider text and uri
export const SLIDER_DATA = [
  {
    title: 'Welcome \n to the Home of \n Award-Winning \n Documentaries',
  },
  {
    title: 'Plans start at \n 2,99% USD/month \n or 19,99$ USD/year',
    img: require('../assets/img/slideTwo.png'),
  },
  {
    title: 'Thousands of \n Shows Available \n Worldwide',
    img: require('../assets/img/slideThree.png'),
  },
  {
    title: 'Award-Winnig \n Docummentaries',
    img: require('../assets/img/slideFour.png'),
  },
];

export const emailRules =
  /^([._-]*[A-Za-z0-9]+[._-]*){1,}@([A-Za-z0-9]+[._-]*){1,}([._-]*[A-Za-z0-9]+){0,}.[A-Za-z]{2,4}$/;

export const passwordRules =
  /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
