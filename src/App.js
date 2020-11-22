import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import * as defaultTheme from "./themes/default";
import * as wording from "./conf/wording";

import AppContext from "./context/AppContext";
import Accordion from "./Accordion/Accordion";
import DesignProperty from "./DesignProperty/DesignProperty";
import Heading from "./Heading/Heading";

/**
 * Get theme in localStorage
 */
function getLocalStorageTheme() {
  const theme = localStorage.getItem('simpleEditorTheme');
  return JSON.parse(theme);
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

  // Set local theme on mount when exists
  useEffect(() => {
    const localTheme = getLocalStorageTheme();
    if (localTheme) {
      console.log('apply local theme', theme);
      setTheme(localTheme);
    }
    console.log('update theme', theme);
  }, [theme])

  function updateTheme(property, value) {
    const reference = property.split('.');
    const category = reference[0];
    const component = reference[1];

    const updateTheme = {
      ...theme,
      [category]: {
        ...theme[category],
        [component]: value,
      },
    }
    setTheme(updateTheme);
  }

  return (
    <AppContext.Provider value={{ updateTheme }}>
      <ThemeProvider theme={theme}>
        <header>
          <Heading as="h1">Simple Theme Editor</Heading>
        </header>
        {Object.keys(theme).map((component) => (
          <Accordion key={component} title={component}>
            {Object.entries(theme[component]).map(([item, value]) => (
              <DesignProperty
                key={`${component}.${item}`}
                reference={`${component}.${item}`}
                value={value}
                label={wording[component][item]}
              />
            ))}
          </Accordion>
        ))}
        <button onClick={() => setThemeInLocalStorage(theme)}>Save</button>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
