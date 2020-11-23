import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import * as defaultTheme from "./themes/default";
import * as wording from "./conf/wording";

import AppContext from "./context/AppContext";
import Accordion from "./Accordion/Accordion";
import DesignProperty from "./DesignProperty/DesignProperty";
import Heading from "./Typography/Heading";
import Button from "./Button/Button";

const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 1140px;
`;

const AccordionGroup = styled.div`
  margin: 0;
  padding: 0;
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

    const newTheme = {
      ...theme,
      [category]: {
        ...theme[category],
        [component]: value,
      },
    }
    setTheme(newTheme);
  }

  return (
    <AppContext.Provider value={{ updateTheme }}>
      <ThemeProvider theme={theme}>
        <Container>
          <header>
            <Heading>Simple Theme Editor</Heading>
          </header>
          <AccordionGroup>
            {Object.keys(theme).map((component, index) => (
            <Accordion key={component} index={index} title={component}>
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
          </AccordionGroup>
          <Button onClick={() => setThemeInLocalStorage(theme)}>Save</Button>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
