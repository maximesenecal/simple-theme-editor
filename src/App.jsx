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
    background-color: ${({ theme }) => theme.colors.primaryBackground[0]};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary[0]};;
`;

const AccordionGroup = styled.div`
  margin: 0;
  padding: 0;
  min-width: 70vh;
`;

/**
 * Get theme in localStorage
 */
function getLocalStorageTheme() {
  const localTheme = localStorage.getItem('simpleEditorTheme');
  if (localTheme) {
    return JSON.parse(localTheme);
  }
  return null;
}

/**
* Set editor theme in local storage
* @param {Object} themeObject New editor theme
*/
function setThemeInLocalStorage(theme) {
  localStorage.setItem('simpleEditorTheme', JSON.stringify(theme));
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

  function updateTheme(component, item, value, type) {
    const newTheme = {
      ...theme,
      [component]: {
        ...theme[component],
        [item]: [value, type],
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
              <Accordion key={component} index={index} title={wording.sections[component]}>
                {Object.entries(theme[component]).map(([item, value]) => (
                  <DesignProperty
                    key={`${component}-${item}`}
                    component={component}
                    item={item}
                    value={value[0]}
                    type={value[1]}
                    label={wording[component][item]}
                  />
                ))}
              </Accordion>
            ))}
          </AccordionGroup>
          <Button id="save-button" onClick={() => setThemeInLocalStorage(theme)}>Save</Button>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
