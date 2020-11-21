import { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

const types = ['text', 'em', 'rem', 'color'];

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground[0]};
  width: 100%;
  padding: 1rem;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function EditPanel({ property, currentValue, currentType, onClose, onSave }) {
  const [type, setType] = useState(currentType);
  const [value, setValue] = useState(currentValue);
  const themeContext = useContext(ThemeContext);

  function getReferencesValues(value) {
    function replaceValueRef(valueRef) {
      // Extract component ref
      const component = valueRef.substring(
        valueRef.lastIndexOf("{") + 1,
        valueRef.lastIndexOf(".")
      );
      // Extract key ref
      const key = valueRef.substring(
        valueRef.lastIndexOf(".") + 1,
        valueRef.lastIndexOf("}")
      );
      if (themeContext[component][key]) {
        return themeContext[component][key][0];
      }
    }

    let regex = /{.*?}/g; // Regex to match property between {}
    const result = value.replace(regex, replaceValueRef);
    return result; // Return string with replace values
  }

  return (
    <Container>
      <EditorHeader>
        <div>{property}</div>
        <button onClick={() => onClose()}>Close</button>
      </EditorHeader>
      <br />
      <EditorContainer>
        <div>
          <label htmlFor={property}>Value :</label>
          <input
            type={type === "color" ? "color" : "text"}
            id={property}
            name={property}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {getReferencesValues(value)}
        </div>
        <div role="radiogroup">
          <span>Type:</span>
          {types.map(item => (
          <div key={item}>
            <input
              type="radio"
              id={`${property}-${item}`}
              name={`${property}-select-type`}
              value={item}
              onChange={(e) => setType(item)}
            />
            <label htmlFor={`${property}-${item}`}>{item}</label>
          </div>
        ))}
        </div>
      </EditorContainer>
      <br />
      <button onClick={() => onSave(value, type)}>OK</button>
    </Container>
  );
}

EditPanel.propTypes = {
  property: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  currentType: PropTypes.oneOf(["text", "em", "px", "color"]).isRequired,
  onSave: PropTypes.func.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
