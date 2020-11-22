import { useState } from "react";
import { ThemeProvider } from "styled-components";

import * as defaultTheme from "./themes/default";

import AppContext from "./context/AppContext";
import Accordion from "./Accordion/Accordion";
import DesignProperty from "./DesignProperty/DesignProperty";
import Heading from "./Heading/Heading";

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

  /**
   * Check references in value
   * @param {String} value User value
   */
  function replaceRefValues(value) {
    function replaceRef(ref) {
      // Extract component ref
      const component = ref.substring(
        ref.lastIndexOf("{") + 1,
        ref.lastIndexOf(".")
      );
      // Extract key ref
      const key = ref.substring(
        ref.lastIndexOf(".") + 1,
        ref.lastIndexOf("}")
      );
      if (theme[component][key]) { // Get value if exists
        return theme[component][key];
      }
    }
    let regex = /{.*?}/g; // Regex to match property between {}
    const result = value.replace(regex, replaceRef);
    return result;
  }

  // Should update all references when a value change
  function updateTheme(reference, value) {
    // setTheme({
    //   ...theme,
    //   [reference]: value,
    // });
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
                label={`${component}.${item}`}
              />
            ))}
          </Accordion>
        ))}
        <button onClick={() => setTheme()}>Save</button>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
