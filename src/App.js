import { useState } from "react";
import { ThemeProvider } from "styled-components";

import * as defaultTheme from "./themes/default";

import Accordion from "./Accordion/Accordion";
import DesignProperty from "./DesignProperty/DesignProperty";
import Heading from "./Heading/Heading";

/**
 * Get theme in localStorage
 */
// function getLocalStorageTheme() {
//   try {
//     const theme = localStorage.getItem('simpleEditorTheme');
//     return JSON.parse(theme);
//   } catch (err) {
//     console.error('Could not loading theme in local storage, loading default instead.', err);
//   }
// }

/**
 * Set editor theme in local storage
 * @param {Object} themeObject New editor theme
 */
// function setThemeInLocalStorage(themeObject) {
//   localStorage.setItem('simpleEditorTheme', JSON.stringify(themeObject));
// }

function App() {
  const [theme, setTheme] = useState(defaultTheme);

  const handleSave = (property, value, type) => {
    console.log(property, value+type);
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Heading as="h1">Simple Theme Editor</Heading>
      </header>
      {Object.keys(theme).map((key) => (
        <Accordion key={key} title={key}>
          {Object.entries(theme[key]).map(([item, value]) => (
            <DesignProperty
              key={item}
              property={item}
              value={value[0]}
              type={value[1]}
              label={item}
              onSave={handleSave}
            />
          ))}
        </Accordion>
      ))}
      <button onClick={() => setTheme()}>Save</button>
    </ThemeProvider>
  );
}

export default App;
