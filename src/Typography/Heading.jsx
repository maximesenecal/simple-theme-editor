import styled from "styled-components";

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ as, theme }) => {
    switch (as) {
      case 'h2':
        return theme.sizes.h2;
      default:
        return theme.sizes.h1;
    };
  }};
`;

export default Heading;