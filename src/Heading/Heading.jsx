import styled from "styled-components";

const Heading = styled.p`
  font-size: ${({ as, theme }) => theme.sizes[as]+theme.sizes[as]};
`;

export default Heading;