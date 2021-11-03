import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d5d7e0',
    },
    secondary: {
      main: '#00b5d2',
    },
    background: {
      default: '#1a1a20',
      paper: 'rgba(0, 0, 0, .9)',
    },
    error: {
      main: '#e84035',
    },
    warning: {
      main: '#fb9806',
    },
    info: {
      main: '#379dec',
    },
    success: {
      main: '#4fb553',
    },
    divider: '#131313',
    },
    text: {
      main: '#ffffff'
    },
    input: {
      color: '#ffffff'
  }
});

const LightTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d5d7e0',
    },
    secondary: {
      main: '#00b5d2',
    },
    background: {
      default: '#1a1a20',
      paper: 'rgba(0, 0, 0, .9)',
    },
    error: {
      main: '#e84035',
    },
    warning: {
      main: '#fb9806',
    },
    info: {
      main: '#379dec',
    },
    success: {
      main: '#4fb553',
    },
    divider: '#131313',
    },
    text: {
      main: '#ffffff'
    },
    input: {
      color: '#ffffff'
  }
});

export {
  Theme,
  LightTheme
} 