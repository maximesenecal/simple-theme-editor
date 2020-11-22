import { useState } from "react";
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

const Panel = styled.div`
  display: ${({ displayed }) => (displayed ? "block" : "none")};
  margin: 0;
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
      <Panel
        id={`sect${index}`}
        role="region"
        aria-labelledby={`accordion${index}id`}
        displayed={displayPanel}
      >
        {children}
      </Panel>
    </>
  );
}

export default Accordion;
