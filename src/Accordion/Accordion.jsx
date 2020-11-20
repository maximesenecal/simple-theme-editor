import { useState } from 'react';
import styled from 'styled-components'

const Container = styled.section`
    width: 100%;
`;

const Panel = styled.div`
    padding: 0 18px;
    display: ${({ displayed }) => (displayed ? "block" : "none")};
    overflow: hidden;
`;

const HeaderButton = styled.button`
    width: 100%;
    padding: 1rem;
    text-align: left;
    background-color: white;
    cursor: pointer;
    border: 0;

    &:hover {
        color: ${({ theme }) => (theme.colors.primary)};
    }
`;

function Accordion({ children }) {
    const [displayPanel, setDisplayPanel] = useState(false);

    return (
        <Container>
            <HeaderButton onClick={() => setDisplayPanel(!displayPanel)}>
                <h2>General colors</h2>
            </HeaderButton>
            <Panel displayed={displayPanel}>
                {children}
            </Panel>
        </Container>
    )
}

export default Accordion;