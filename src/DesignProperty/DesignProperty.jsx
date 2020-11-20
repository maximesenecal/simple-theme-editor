import styled from 'styled-components'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => (theme.colors.primary)};
    }
`;

const EditableContainer = styled.div`
    background-color: #EBEBEB;
    padding: 1rem;
`;

function DesignProperty({ property, value, inputType, label, onChange }) {
    const [editable, setEditable] = useState(false);

    function ColorEditor() {
        return (
            <div style={{ display: 'flex' }}>
                <label htmlFor={property}>Value :</label>
                <input type="color" id={property} name={property} value={value} onChange={onChange} />
            </div>
        );
    }

    function TextEditor() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <label htmlFor={property}>Value :</label>
                    <input type="text" id={property} name={property} value={value} onChange={onChange} />
                </div>
                <div style={{ display: 'flex' }}>
                    Type :
                    <input type="radio" id="text-type" name="select-type-property" value="text" />
                    <label htmlFor="text-type">text</label>
                    <input type="radio" id="em-type" name="select-type-property" value="em" />
                    <label htmlFor="em-type">em</label>
                    <input type="radio" id="px-type" name="select-type-property" value="px" />
                    <label htmlFor="px-type">px</label>
                </div>
            </div>
        );
    }

    const editor = inputType === 'color' ? <ColorEditor /> : <TextEditor />;

    if (editable) {
        return (
            <EditableContainer>
                <i>{property}</i>
                {editor}
                <Button onClick={() => setEditable(false)}>OK</Button>
            </EditableContainer>
        )
    }
    return (
        <Container onClick={() => setEditable(true)}>
            <div>
                <label htmlFor={property}>{label}</label>
                <input disabled type="color" id={property} name={property} value={value} />
            </div>
            <i>{property}</i>
        </Container>
    );
};

DesignProperty.propTypes = {
    onChange: PropTypes.func,
    property: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    inputType: PropTypes.oneOf(['radio', 'text']),
    label: PropTypes.string,
}

DesignProperty.defaultProps = {
    type: 'text',
    inputType: 'text',
}

export default DesignProperty;