import { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import AppContext from "../../context/AppContext";

import Button from "../../Button/Button";
import TextInput from "../../TextInput/TextInput";
import Text from "../../Typography/Text";

const types = ['text', 'em', 'rem', 'color'];

const FormContainer = styled.form`
  position: relative;
  padding: 1rem;
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

function EditPanel({ reference, currentValue, onClose }) {
  const [type, setType] = useState('text');
  const [value, setValue] = useState(currentValue);
  const context = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
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
    <FormContainer onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Text as="label" htmlFor={`${reference}-input`}>Value :</Text>
        </legend>
        <TextInput
          type={type === "color" ? "color" : "text"}
          id={`${reference}-input`}
          name={`${reference}-input`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </fieldset>
      <fieldset role="radiogroup">
        <legend>Type:</legend>
        {types.map((item) => (
          <>
            <input
              type="radio"
              id={`${reference}-select-${item}`}
              name={`${reference}-select-type`}
              value={item}
              onChange={(e) => setType(item)}
            />
            <label htmlFor={`${reference}-select-${item}`}>{item}</label>
          </>
        ))}
      </fieldset>
      <Button type="submit">Update</Button>
      <CloseButton onClick={() => onClose()}>Close</CloseButton>
    </FormContainer>
  );
}

EditPanel.propTypes = {
  reference: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
};

EditPanel.defaultProps = {};

export default EditPanel;
