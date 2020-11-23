import styled, { ThemeContext } from "styled-components";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import EditPanel from "./EditPanel/EditPanel";
import Text from "../Typography/Text";

const Container = styled.div`
  margin-bottom: 1rem;
`;

const PreviewPanel = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 2px solid white;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  position: relative;
  text-align: left;
  width: 100%;
  outline: none;
  cursor: pointer;
  filter: drop-shadow(0 1mm 2mm rgba(0, 0, 0, 0.1));

  &:hover {
    border: ${({ theme }) => theme.textfield.border};
  }
  &:focus {
    border: ${({ theme }) => theme.textfield.border};
  }
`;

function DesignProperty({ reference, value, label }) {
  const [editable, setEditable] = useState(false);
  const themeContext = useContext(ThemeContext);

  function replaceRefsinValue(str) {
    function replaceRef(ref) {
      const category = ref.substring(
        ref.lastIndexOf("{") + 1,
        ref.lastIndexOf(".")
      );
      const component = ref.substring(
        ref.lastIndexOf(".") + 1,
        ref.lastIndexOf("}")
      );
      if (themeContext[category][component]) { // Get value if exists
        return themeContext[category][component];
      }
      return 'error';
    }
    const regex = /{.*?}/g; // Regex to match references between {}
    const result = str.replace(regex, replaceRef);
    return result;
  }

  return (
    <Container>
      <PreviewPanel id="header-panel" onClick={() => setEditable(!editable)}>
        <Text>
          {label}
          <span id="value"><b>{replaceRefsinValue(value)}</b></span>
        </Text>
        <i>{reference}</i>
      </PreviewPanel>
      {editable && (
        <EditPanel
          reference={reference}
          currentValue={value}
          onClose={() => setEditable(false)}
        />
      )}
    </Container>
  );
}

DesignProperty.propTypes = {
  reference: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

DesignProperty.defaultProps = {
};

export default DesignProperty;
