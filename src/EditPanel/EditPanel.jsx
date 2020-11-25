import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";

import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Text from "../Typography/Text";
import types from "../conf/types";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground[0]};
  padding: 0.5rem;
  margin-top: 5px;
`;

const HeaderEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RadioContainer = styled.div`
  display: flex;
`;

function EditPanel({ header, currentValue, currentType, component, item, onClose }) {
  const [type, setType] = useState(currentType);
  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState(null);

  const context = useContext(AppContext);
  const themeContext = useContext(ThemeContext);

  const getRef = (ref) => {
    const categoryRef = ref.substring(
      ref.lastIndexOf("{") + 1,
      ref.lastIndexOf(".")
    );
    const itemRef = ref.substring(
      ref.lastIndexOf(".") + 1,
      ref.lastIndexOf("}")
    );
    return themeContext[categoryRef][itemRef];
  }

  const validateRefs = (str) => {
    const regex = /{.*?}/g; // Regex to match references between {}
    const refs = str.match(regex);
    let errorMessage = null;

    if (refs && refs.length >= 1) {
      refs.forEach(ref => {
        if (!getRef(ref)) {
          errorMessage = `Reference ${ref} doesn't exists.`;
        }
      })
    }
    return errorMessage;
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    const errorMessage = validateRefs(e.target.value);
    setError(errorMessage);
  };

  function handleClick() {
    const { updateTheme } = context;

    updateTheme(component, item, value, type);
  }

  return (
    <Container>
      <HeaderEdit>
        <Text bold>{header}</Text>
        <Button id="close-button" onClick={() => onClose()}>Close</Button>
      </HeaderEdit>
      <fieldset>
        <Text as="label" htmlFor={`${item}-input`}>Value</Text>
        <TextInput
          type={type === "color" ? "color" : "text"}
          id={`${item}-input`}
          name={`${item}-input`}
          value={value}
          onChange={handleChange}
          error={error}
          aria-invalid={!!error}
          aria-describedby={error ? "error-message" : undefined}
        />
        <Text>Type</Text>
        <RadioContainer>
          {Object.keys(types).map((inputType, index) => (
            <React.Fragment key={`type-${component}-${item}-${inputType}`}>
              <input
                type="radio"
                id={`select-type-${component}-${item}-${index}`}
                name="select-type"
                value={inputType}
                onChange={() => setType(inputType)}
                defaultChecked={inputType === currentType}
              />
              <label htmlFor={`select-type-${component}-${item}-${index}`}>{inputType}</label>
            </React.Fragment>
          ))}
        </RadioContainer>
      </fieldset>
      <Button type="submit" disabled={!!error} id="update-button" onClick={() => handleClick()}>Update</Button>
    </Container>
  );
}

EditPanel.propTypes = {
  header: PropTypes.string.isRequired,
  currentType: PropTypes.oneOf(['text', 'color', 'px', 'em', 'rem']).isRequired,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  component: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
