import useDarkMode from 'use-dark-mode';

const ThemeStatus = () => {
  const { value } = useDarkMode(false);

  return value ? 'Dark Mode' : 'Light Mode';
};

export default ThemeStatus;
