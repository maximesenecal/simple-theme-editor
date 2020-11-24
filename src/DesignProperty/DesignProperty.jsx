import styled, { ThemeContext } from "styled-components";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import EditPanel from "../EditPanel/EditPanel";
import Text from "../Typography/Text";
import { regex, getRefInTheme } from "../helpers/references";

const Container = styled.div`
  margin: 0.5rem 0;
`;

const PreviewPanel = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  margin: 0;
  position: relative;
  text-align: left;
  width: 100%;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
    transition: 0.2s ease-in;
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
`;

function DesignProperty({ reference, value, label }) {
  const [editable, setEditable] = useState(false);
  const themeContext = useContext(ThemeContext);
  const header = `${label} - ${value.replace(regex, (ref) => getRefInTheme(ref, themeContext))}`;

  return (
    <Container>
      {editable ? (
        <EditPanel
          header={header}
          currentValue={value}
          reference={reference}
          onClose={() => setEditable(false)}
        />
      ) : (
          <PreviewPanel id="header-panel" onClick={() => setEditable(!editable)}>
            <Text id="value">
              {header}
            </Text>
            <i>{reference}</i>
          </PreviewPanel>
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
