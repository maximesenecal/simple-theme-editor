import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import * as defaultTheme from './themes/default';

import Accordion from './Accordion/Accordion';
import Button from './Button/Button';
import DesignProperty from './DesignProperty/DesignProperty';

/**
 * Get theme in localStorage
 */
function getLocalStorageTheme() {
  try {
    const theme = localStorage.getItem('simpleEditorTheme');
    return JSON.parse(theme);
  } catch (err) {
    console.error('Could not loading theme in local storage, loading default instead.', err);
  }
}

/**
 * Set editor theme in local storage
 * @param {Object} themeObject New editor theme
 */
function setThemeInLocalStorage(themeObject) {
  localStorage.setItem('simpleEditorTheme', JSON.stringify(themeObject));
}

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [primaryFontColor, setPrimaryFontColor] = useState(['#4CB1F8', 'color']);

  useEffect(() => {
    const localTheme = getLocalStorageTheme();
    if (localTheme) {
      setTheme(localTheme)
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <header>
        <h1 style={{ color: '#4CB1F8' }}>Simple Theme Editor</h1>
      </header>
      <Accordion>
        <DesignProperty
          property="primary-font-color"
          value={primaryFontColor[0]}
          type={primaryFontColor[1]}
          label="Primary font color :"
          onSave={(value, type) => setPrimaryFontColor([value, type])}
        />
      </Accordion>
      <Button onClick={() => setTheme()}>Save</Button>
    </ThemeProvider>
  );
}

export default App;
