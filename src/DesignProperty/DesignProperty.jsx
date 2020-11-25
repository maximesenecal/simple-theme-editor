import styled, { ThemeContext } from "styled-components";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import EditPanel from "../EditPanel/EditPanel";
import Text from "../Typography/Text";

const Container = styled.div`
  margin: 0.5rem 0;
`;

const PreviewPanel = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBackground[0]};
  margin: 0;
  position: relative;
  text-align: left;
  width: 100%;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBackground[0]};
    transition: ease .5s;
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.secondaryBackground[0]};
  }
`;

function DesignProperty({ component, item, value, label, type }) {
  const [editable, setEditable] = useState(false);
  const themeContext = useContext(ThemeContext);
  const regex = /{.*?}/g; // Regex to match references between {}

  const getRef = (ref) => {
    const categoryRef = ref.substring(
      ref.lastIndexOf("{") + 1,
      ref.lastIndexOf(".")
    );
    const itemRef = ref.substring(
      ref.lastIndexOf(".") + 1,
      ref.lastIndexOf("}")
    );
    return themeContext[categoryRef][itemRef][0];
  }
  const replacedValue = value.toString().replace(regex, getRef);

  const header = `${label}(${themeContext[component][item][1]}) - ${replacedValue}`;

  return (
    <Container>
      {editable ? (
        <EditPanel
          header={header}
          currentValue={value}
          currentType={type}
          component={component}
          item={item}
          onClose={() => setEditable(false)}
        />
      ) : (
          <PreviewPanel id="header-panel" onClick={() => setEditable(!editable)}>
            <Text id="value">
              {header}
            </Text>
            <i>{`${component}.${item}`}</i>
          </PreviewPanel>
        )}
    </Container>
  );
}

DesignProperty.propTypes = {
  component: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['text', 'color', 'px', 'em', 'rem']).isRequired,
  label: PropTypes.string.isRequired,
};

DesignProperty.defaultProps = {
};

export default DesignProperty;
