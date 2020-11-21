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
   * Get theme value with reference
   * @param {String} ref Reference value
   */
  function getValueFromRef(ref) {
    function replaceWithValue(value) {
      // Extract component ref
      const component = value.substring(
        value.lastIndexOf("{") + 1,
        value.lastIndexOf(".")
      );
      // Extract key ref
      const key = value.substring(
        value.lastIndexOf(".") + 1,
        value.lastIndexOf("}")
      );
      if (theme[component][key]) { // Get value if exists
        return theme[component][key][0];
      }
    }

    let regex = /{.*?}/g; // Regex to match property between {}
    const result = ref.replace(regex, replaceWithValue);
    return result;
  }

  function updateTheme() {
    console.log('update theme');
    // setTheme({
    //   ...theme,
    //   [component]: {
    //     ...theme[component],
    //     [item]: update,
    //   },
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
                key={item}
                property={item}
                value={value[0]}
                type={value[1]}
                label={item}
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
