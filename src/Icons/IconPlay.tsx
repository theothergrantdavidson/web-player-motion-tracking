import React from 'react';
import styled from 'styled-components';

const Host = styled.svg``;

export const IconPlay: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <Host onClick={onClick} viewBox="0 0 100 100" width="100%" height="100%">
            <polyline points={`0,0 75,50 0,100 0,0`} fill="grey" />
        </Host>
    );
};
