import styled from 'styled-components'

const Button = styled.button`
    background-color: ${({ theme }) => (theme.colors.primary)};
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border: 2px solid ${({ theme }) => (theme.colors.primary)};
`;

export default Button;