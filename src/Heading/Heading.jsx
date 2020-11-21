import styled from "styled-components";

const Heading = styled.p`
  font-size: ${({ as, theme }) => theme.sizes[as][0]+theme.sizes[as][1]};
`;

export default Heading;