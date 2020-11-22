import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import * as defaultTheme from "./themes/default";
import * as wording from "./conf/wording";

import AppContext from "./context/AppContext";
import Accordion from "./Accordion/Accordion";
import DesignProperty from "./DesignProperty/DesignProperty";
import Heading from "./Heading/Heading";

const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 1140px;
`;

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
      setTheme(localTheme);
    }
  }, [])

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
        <Container>
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
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
