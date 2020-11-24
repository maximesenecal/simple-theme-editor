import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as ChevronUp } from './chevron-up.svg';
import { ReactComponent as ChevronDown } from './chevron-down.svg';

import Heading from "../Typography/Heading";

const Container = styled.div`
  margin: 0.5rem 0;
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  position: relative;
  text-align: left;
  width: 100%;
  cursor: pointer;
  border: none;
`;

function Accordion({ children, title, index }) {
  const [displayPanel, setDisplayPanel] = useState(false);

  return (
    <Container>
      <HeaderButton
        aria-expanded={displayPanel}
        aria-disabled={displayPanel}
        aria-controls={`sect${index}`}
        id={`accordion${index}id`}
        onClick={() => setDisplayPanel(!displayPanel)}
      >
        {displayPanel ? <ChevronDown /> : <ChevronUp />}
        <Heading as="h2">
          {title}
        </Heading>
      </HeaderButton>
      { displayPanel && (
        <Container
          id={`sect${index}`}
          role="region"
          aria-labelledby={`accordion${index}id`}
        >
          {children}
        </Container>
      )}
    </Container>
  );
}

Accordion.defaultProps = {
  index: 0,
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default Accordion;
