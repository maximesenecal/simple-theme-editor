import { useState } from 'react';

import Accordion from './Accordion/Accordion';
import Button from './Button/Button';
import DesignProperty from './DesignProperty/DesignProperty';

function App() {
  const [primaryFont, setPrimaryFont] = useState('#eee');
  const [primaryBackground, setPrimaryBackground] = useState('#eee');

  return (
    <div>
      <header>
        <h1 style={{ color: '#4CB1F8' }}>Simple Theme Editor</h1>
      </header>
      <Accordion>
        <DesignProperty
          property="primary-font-color"
          value={primaryFont}
          label="Primary font color :"
          onChange={(e) => setPrimaryFont(e.target.value)}
          inputType='color'
        />
        <DesignProperty property="primary-background-color" value={primaryBackground} label="Primary background color :" onChange={(e) => setPrimaryBackground(e.target.value)} />
      </Accordion>
      <Button onClick={() => console.log('theme saved')}>Save</Button>
    </div>
  );
}

export default App;
