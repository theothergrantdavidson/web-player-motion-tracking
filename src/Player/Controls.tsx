import React, { useCallback, useEffect, useState } from 'react';
import GlobalStore from '../GlobalStore';
import styled from 'styled-components';
import { IconPause } from '../Icons/IconPause';
import { IconPlay } from '../Icons/IconPlay';

const PlayPauseContainer = styled.div<{ blob: boolean }>`
    transition: all 0.5s ease-in;
    cursor: ${({ blob }) => (blob ? 'pointer' : 'not-allowed')};
    :hover {
        svg {
            polyline {
                fill: #1cd43d;
            }
        }
    }

    svg {
        width: 20px;
        height: 20px;
        polyline {
            fill: white;
        }
    }
`;

export const Controls: React.FC<{
    playing: (playing: boolean) => void;
    showControls?: boolean;
}> = ({ playing, showControls = true }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const store = GlobalStore.getInstance();

    useEffect(() => {
        store.$srcBlob.subscribe(b => b && setIsPlaying(false));
    }, []);

    const onContolsClick = useCallback(() => {
        if (!!store.srcBlob) {
            const _isPlaying = !isPlaying;
            setIsPlaying(_isPlaying);
            playing(_isPlaying);

            if (_isPlaying) {
                if (store.videoSrc.currentTime === store.videoSrc.duration) {
                    store.videoSrc.currentTime = 0;
                }
                store.videoSrc.play();
            } else {
                store.videoSrc.pause();
            }
        }
    }, [isPlaying, store]);

    useEffect(() => {
        if (store.videoSrc) {
            store.videoSrc.ontimeupdate = () => {
                const progress = store.videoSrc.currentTime / store.videoSrc.duration;
                if (progress === 1) {
                    setIsPlaying(false);
                }
            };
        }
    }, [store.videoSrc]);

    return (
        <PlayPauseContainer onClick={onContolsClick} blob={!!store.srcBlob}>
            {console.info(!!store.srcBlob)}
            {!!isPlaying ? <IconPause /> : <IconPlay />}
        </PlayPauseContainer>
    );
};
