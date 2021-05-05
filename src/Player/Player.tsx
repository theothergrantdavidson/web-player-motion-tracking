import React, { useCallback, useEffect, useState } from 'react';
import { FileInput } from '../FileInput';
import styled from 'styled-components';
import { Controls } from './Controls';
import { Viewer } from './Viewer';
import GlobalStore from '../GlobalStore';

const Host = styled.div`
    display: flex;
    flex-flow: column;
    position: relative;
`;

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    height: 500px;
`;

const ViewerContainer = styled.div`
    width: 100%;
    height: 800px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ControlsContainer = styled.div`
    width: inherit;
    height: 500px;
    z-index: 10;
    position: absolute;
    display: flex;
    flex-flow: column-reverse;
    align-items: center;
    padding-bottom: 10px;
`;

export const Player: React.FC = () => {
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
                    <ControlsContainer>
                        <Controls playing={setIsPlaying} showControls={showControls} />
                    </ControlsContainer>
                    <Viewer videoSrc={selectedFile} />
                </ViewerContainer>
            </PlayerContainer>
            <FileInput onFileSelect={setSelectedFileCb} />
        </Host>
    );
};
