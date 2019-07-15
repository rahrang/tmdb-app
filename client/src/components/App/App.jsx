import React from 'react';

import GlobalStyles from './GlobalStyles/GlobalStyles';
import ThemeProvider from './Theme/Provider';
import ReduxProvider from './ReduxProvider';

import Router from './Router';

class App extends React.Component {
  render() {
    return (
      <div>
        <ThemeProvider>
          <React.Fragment>
            <ReduxProvider>
              <GlobalStyles />
              <div className="body-content">
                <Router />
              </div>
            </ReduxProvider>
          </React.Fragment>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
