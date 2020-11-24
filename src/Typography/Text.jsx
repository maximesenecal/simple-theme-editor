import styled from "styled-components";

const Text = styled.p`
  font-size: ${({ theme }) => theme.sizes.text};
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
`;

export default Text;