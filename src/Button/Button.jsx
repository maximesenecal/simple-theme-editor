import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttons.background};
  color: ${({ theme }) => theme.buttons.color};
  font-size: ${({ theme }) => theme.buttons.fontSize};
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    border-color: black;
  }
  &:focus {
    border-color: black;
  }
`;

export default Button;
