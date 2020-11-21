import { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppContext from "../../context/AppContext";

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

function EditPanel({ property, currentValue, currentType, onClose }) {
  const [type, setType] = useState(currentType);
  const [value, setValue] = useState(currentValue);
  const context = useContext(AppContext);
  
  function handleClick() {
    const { updateTheme } = context;
    updateTheme(property, [value, type]);
    onClose();
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
      <button onClick={() => handleClick()}>OK</button>
    </Container>
  );
}

EditPanel.propTypes = {
  property: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  currentType: PropTypes.oneOf(["text", "em", "px", "color"]).isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
