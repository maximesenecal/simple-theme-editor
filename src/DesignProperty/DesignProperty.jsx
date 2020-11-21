import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

import EditPanel from "./EditPanel/EditPanel";

const Container = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border-bottom: 1px solid black;
`;

const PreviewPanel = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[0]};
  }
`;

function DesignProperty({ property, value, type, label, onSave }) {
  const [editable, setEditable] = useState(false);

  function handleSave(updateValue, updateType) {
    onSave(property, updateValue, updateType);
    setEditable(false);
  }

  return (
    <Container>
      { editable ? (
        <EditPanel
          property={property}
          currentValue={value}
          currentType={type}
          onClose={() => setEditable(false)}
          onSave={handleSave}
        />
      ) : (
          <PreviewPanel onClick={() => setEditable(true)}>
            <p>{label}</p>
            <p>{value}</p>
            <i>{property}</i>
          </PreviewPanel>
        )}
    </Container>
  );
}

DesignProperty.propTypes = {
  onSave: PropTypes.func,
  property: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["color", "text", "em", "rem", "px"]),
  label: PropTypes.string,
};

DesignProperty.defaultProps = {
  type: "text",
};

export default DesignProperty;
