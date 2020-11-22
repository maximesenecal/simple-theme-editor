import styled from "styled-components";

const TextInput = styled.input`
    box-sizing: border-box;
    margin: 0.2rem 0;
    font-size: ${({ theme }) => theme.textfield.textSize};;
    vertical-align: initial;
    outline: 2px solid transparent;
    outline-offset: -2px;
    height: 2.5rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.textfield.fontColor};
    background-color: ${({ theme }) => theme.textfield.background};
    border: ${({ theme }) => theme.textfield.border};

    &[type="color"] {
        padding: 0;
        outline: none;
        border: none;
    }

    &:focus {
        outline: ${({ theme }) => theme.textfield.fontColor};
        outline-offset: -2px;
    }
`;

export default TextInput;