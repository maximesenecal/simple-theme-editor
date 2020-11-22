import styled from "styled-components";

const TextInput = styled.input`
    box-sizing: border-box;
    margin: 0;
    font-size: 100%;
    vertical-align: initial;
    outline: 2px solid transparent;
    outline-offset: -2px;
    height: 2.5rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.textfield.fontColor};
    background-color: #f4f4f4;
    border: none;
    border-bottom: 1px solid grey;

    &[type="color"] {
        padding: 0;
        outline: none;
        border: none;
    }

    &:focus {
        outline: 2px solid ${({ theme }) => theme.colors.primary};
        outline-offset: -2px;
    }
`;

export default TextInput;