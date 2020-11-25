import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttons.background[0]};
  color: ${({ theme }) => theme.buttons.color[0]};
  font-size: ${({ theme }) => theme.buttons.fontSize[0]+theme.buttons.fontSize[1]};
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

export default Button;
