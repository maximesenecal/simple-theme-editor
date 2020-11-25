import styled from "styled-components";

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary[0]};
  font-size: ${({ theme }) => theme.sizes.text[0]+theme.sizes.text[1]};
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
`;

export default Text;