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
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function DesignProperty({ reference, value, label }) {
  const [editable, setEditable] = useState(false);

  return (
    <Container>
      { editable ? (
        <EditPanel
          reference={reference}
          currentValue={value}
          onClose={() => setEditable(false)}
        />
      ) : (
          <PreviewPanel onClick={() => setEditable(true)}>
            <p>{label}</p>
            <p>{value}</p>
            <i>{reference}</i>
          </PreviewPanel>
        )}
    </Container>
  );
}

DesignProperty.propTypes = {
  reference: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

DesignProperty.defaultProps = {
};

export default DesignProperty;
