import styled from "styled-components";

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary[0]};
  font-size: ${({ as, theme }) => {
    switch (as) {
      case 'h2':
        return theme.sizes.h2[0]+theme.sizes.h2[1];
      default:
        return theme.sizes.h1[0]+theme.sizes.h1[1];
    };
  }};
`;

export default Heading;