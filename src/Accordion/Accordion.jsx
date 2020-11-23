import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Heading from "../Typography/Heading";

const HeaderButton = styled.button`
  display: block;
  background: white;
  border: 2px solid white;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.sizes.h2};
  font-weight: normal;
  margin: 0;
  position: relative;
  text-align: left;
  width: 100%;
  outline: none;
  cursor: pointer;
  margin-bottom: 1rem;
  filter: drop-shadow(0 1mm 2mm rgba(0, 0, 0, 0.1));

  &:hover {
    border: ${({ theme }) => theme.textfield.border};
  }
  &:focus {
    border: ${({ theme }) => theme.textfield.border};
  }
`;

function Accordion({ children, title, index }) {
  const [displayPanel, setDisplayPanel] = useState(false);

  return (
    <>
      <HeaderButton
        aria-expanded={displayPanel}
        aria-disabled={displayPanel}
        aria-controls={`sect${index}`}
        id={`accordion${index}id`}
        onClick={() => setDisplayPanel(!displayPanel)}
      >
        <Heading as="h2">
          {title}
        </Heading>
      </HeaderButton>
      { displayPanel && (
        <div
          id={`sect${index}`}
          role="region"
          aria-labelledby={`accordion${index}id`}
        >
          {children}
        </div>
      )}
    </>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

Accordion.defaultProps = {};

export default Accordion;
