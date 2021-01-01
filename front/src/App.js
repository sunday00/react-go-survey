import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import indigo from '@material-ui/core/colors/indigo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Header from './components/common/Header';

library.add(fas);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[300],
    },
    secondary: {
      main: pink[500],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container style={{ padding: 0 }} maxWidth={false}>
          <Header />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
