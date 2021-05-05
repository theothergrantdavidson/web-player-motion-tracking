import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Player } from './Player/Player';
import { Mat } from 'opencv-ts';
import { OutputDisplay } from './OutputDisplay';

const Host = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const App: React.FC = () => {
    return (
        <Host>
            <Player />
            <OutputDisplay processFn={(mat: Mat) => mat} />
        </Host>
    );
};
