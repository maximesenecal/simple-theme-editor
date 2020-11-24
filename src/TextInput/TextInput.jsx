/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as Alert } from "./alert-circle.svg";

const StyledInput = styled.input`
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.textfield.textSize};;
    height: 30px;
    padding: 0 10px;
    margin-top: 10px;
    color: ${({ theme }) => theme.textfield.fontColor};
    background-color: ${({ theme }) => theme.textfield.background};
    border: ${({ theme, error }) => error ? "2px solid red" : theme.textfield.border};

    &[type="color"] {
        padding: 0;
    }
`;

const ErrorText = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: bold;
  color: red;
  margin-top: 7px;
`;

const TextInput = React.forwardRef(({ error, ...rest}, ref) => (
    <div>
        <StyledInput ref={ref} error={error} {...rest} />
        {error && (
            <ErrorText id="error-message">
                <Alert width={18} height={18} style={{ marginRight: 5 }} />
                {error}
            </ErrorText>
        )}
    </div>
));

TextInput.propTypes = {
    error: PropTypes.string,
};

TextInput.defaultProps = {
    error: null,
};

export default TextInput;