import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";

import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Text from "../Typography/Text";
import { validateReferences } from "../helpers/references";

const types = ['text', 'em', 'rem', 'px', 'color'];

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  padding: 0.5rem;
  margin-top: 5px;
`;

const HeaderEdit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function EditPanel({ header, reference, currentValue, onClose }) {
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
      <HeaderEdit>
        <Text bold>{header}</Text>
        <Button id="close-button" onClick={() => onClose()}>Close</Button>
      </HeaderEdit>
      <fieldset>
        <Text as="label" htmlFor={`${reference}-input`}>Value</Text>
        <TextInput
          type={type === "color" ? "color" : "text"}
          id={`${reference}-input`}
          name={`${reference}-input`}
          value={value}
          onChange={handleChange}
          error={error}
          aria-invalid={!!error}
          aria-describedby={error ? "error-message" : undefined}
        />
      </fieldset>
      <fieldset>
        <Text>Type</Text>
        {types.map((item, index) => (
          <div key={item}>
            <input
              type="radio"
              id={`${reference}-select-${index}`}
              name={`${reference}-select-type`}
              value={item}
              onChange={() => setType(item)}
              defaultChecked={index === 0}
            />
            <label htmlFor={`${reference}-select-${index}`}>{item}</label>
          </div>
        ))}
      </fieldset>
      <Button type="submit" disabled={!!error} id="update-button" onClick={() => handleClick()}>Update</Button>
    </Container>
  );
}

EditPanel.propTypes = {
  header: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
