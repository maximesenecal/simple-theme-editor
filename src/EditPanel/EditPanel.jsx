import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";

import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Text from "../Typography/Text";
import { validateReferences } from "../helpers/references";

const types = ['text', 'em', 'rem', 'color'];

const Container = styled.form`
  position: relative;
  padding: 1rem;
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const ErrorText = styled.p`
    font-size: ${({ theme }) => theme.textfield.textSize};;
    font-weight: bold;
    color: red;
`;

function EditPanel({ reference, currentValue, onClose }) {
  const [type, setType] = useState('text');
  const [value, setValue] = useState(currentValue);
  const [error, setError] = useState(null);

  const context = useContext(AppContext);
  const themeContext = useContext(ThemeContext);

  const handleChange = (e) => {
    setValue(e.target.value);
    const errorMessage = validateReferences(e.target.value, themeContext);
    setError(errorMessage);
  };

  function handleClick() {
    const { updateTheme } = context;

    let newValue = value;
    switch (type) {
      case 'em':
      case 'rem':
      case 'px':
        newValue += type; // Append type when necessary
        break;
      default:
        break;
    }
    updateTheme(reference, newValue);
  }

  return (
    <Container>
      <Text as="label" htmlFor={`${reference}-input`}>Value :</Text>
      <TextInput
        type={type === "color" ? "color" : "text"}
        id={`${reference}-input`}
        name={`${reference}-input`}
        value={value}
        onChange={handleChange}
      />
      { error && (
        <ErrorText id="error-message">
          { error}
        </ErrorText>
      )}
      <Text>Type:</Text>
      {types.map((item) => (
        <div key={item}>
          <input
            type="radio"
            id={`${reference}-select-${item}`}
            name={`${reference}-select-type`}
            value={item}
            onChange={() => setType(item)}
          />
          <label htmlFor={`${reference}-select-${item}`}>{item}</label>
        </div>
      ))}
      <Button disabled={!!error} id="update-button" onClick={() => handleClick()}>Update</Button>
      <CloseButton id="close-button" onClick={() => onClose()}>Close</CloseButton>
    </Container>
  );
}

EditPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
