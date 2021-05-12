import React, { useCallback, useEffect, useState } from 'react';
import { FileInput } from '../FileInput';
import styled from 'styled-components';
import { Controls } from './Controls';
import { Viewer } from './Viewer';
import GlobalStore from '../GlobalStore';
import { Rect } from 'opencv-ts';

const Host = styled.div`
    display: flex;
    flex-flow: column;
    height: fit-content;
    align-items: center;
`;

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    height: 550px;
    background-color: black;
    position: relative;
`;

const ViewerContainer = styled.div`
    width: 800px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ControlsContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-flow: column-reverse;
    align-items: center;
    padding: 10px 0px;
    background: black;
`;

const InputContainer = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    height: auto;
    padding: 10px 5px;
`;

export const Player: React.FC<{ onSelection(r: Rect): void }> = ({ onSelection }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showControls, setShowControls] = useState<boolean>();
    const [selectedFile, setSelectedFile] = useState<string | undefined>();
    const store = GlobalStore.getInstance();

    const setSelectedFileCb = useCallback(
        (file: string | undefined) => {
            store.srcBlob = file;
            setSelectedFile(file);
        },
        [store]
    );

    return (
        <Host>
            <PlayerContainer
                onMouseOver={() => {
                    setShowControls(true);
                }}
                onMouseLeave={() => {
                    setShowControls(false);
                }}
            >
                <ViewerContainer>
                    <Viewer videoSrc={selectedFile} onSelection={onSelection} />
                </ViewerContainer>
                <ControlsContainer>
                    <Controls playing={setIsPlaying} showControls={showControls} />
                </ControlsContainer>
            </PlayerContainer>
            <InputContainer>
                <FileInput onFileSelect={setSelectedFileCb} />
            </InputContainer>
        </Host>
    );
};
