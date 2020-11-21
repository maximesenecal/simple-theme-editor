import { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  background-color: #ebebeb;
  padding: 1rem;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
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
        return themeContext[component][key];
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
        <div>{getReferencesValues(value)}</div>
        <button onClick={() => onClose()}>Close</button>
      </EditorHeader>
      <EditorContainer>
        <label htmlFor={property}>Value :</label>
        <input
          type={type === "color" ? "color" : "text"}
          id={property}
          name={property}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
          Type :
          <input
            type="radio"
            id="text-type"
            name="select-type-property"
            value="text"
            onChange={(e) => setType("text")}
            checked={type === "text"}
          />
          <label htmlFor="text-type">text</label>
          <input
            type="radio"
            id="em-type"
            name="select-type-property"
            value="em"
            onChange={(e) => setType("em")}
            checked={type === "em"}
          />
          <label htmlFor="em-type">em</label>
          <input
            type="radio"
            id="px-type"
            name="select-type-property"
            value="px"
            onChange={(e) => setType("px")}
            checked={type === "px"}
          />
          <label htmlFor="px-type">px</label>
          <input
            type="radio"
            id="color-type"
            name="select-type-property"
            value="color"
            onChange={(e) => setType("color")}
            checked={type === "color"}
          />
          <label htmlFor="color-type">color</label>
        </div>
      </EditorContainer>
      <button onClick={() => onSave(value, type)}>OK</button>
    </Container>
  );
}

EditPanel.propTypes = {
  property: PropTypes.string.isRequired,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  currentType: PropTypes.oneOf(["text", "em", "px", "color"]).isRequired,
  onSave: PropTypes.func.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
