import { createMuiTheme } from '@material-ui/core';
import './App.css';
import { AppRoutes } from './Routes/AppRoutes';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    fontWeightMedium: "bolder",
    fontSize: 14,
  },

  
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes/>
    </ThemeProvider>
  );
}

export default App;
