import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

import EditPanel from "./EditPanel/EditPanel";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #444;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function DesignProperty({ property, value, type, label, onSave }) {
  const [editable, setEditable] = useState(false);

  function handleSave(updateValue, updateType) {
    onSave(updateValue, updateType);
    setEditable(false);
  }

  if (editable) {
    return (
      <EditPanel
        property={property}
        currentValue={value}
        currentType={type}
        onClose={() => setEditable(false)}
        onSave={handleSave}
      />
    );
  }
  return (
    <Container onClick={() => setEditable(true)}>
      <div>
        <label htmlFor={property}>{label}</label>
        <input
          disabled
          type={type === "color" ? "color" : "text"}
          id={property}
          name={property}
          value={value}
        />
      </div>
      <i>{property}</i>
    </Container>
  );
}

DesignProperty.propTypes = {
  onSave: PropTypes.func,
  property: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["color", "text"]),
  label: PropTypes.string,
};

DesignProperty.defaultProps = {
  type: "text",
};

export default DesignProperty;
