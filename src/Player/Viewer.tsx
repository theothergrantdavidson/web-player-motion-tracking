import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SectionSelector } from '../SectionSelector/SectionSelector';
import styled from 'styled-components';
import GlobalStore from '../GlobalStore';

interface ViewerProps {
    videoSrc?: string;
}

const ViewerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: black;
`;

const Video = styled.video`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
`;

export const Viewer: React.FC<ViewerProps> = ({ videoSrc = '' }) => {
    const containerRef = useRef<HTMLDivElement | null>();
    const videoRef = useRef<HTMLVideoElement | null>();
    const store = GlobalStore.getInstance();

    const [vidWidth, setVidWidth] = useState(100);
    const [vidHeight, setVidHeight] = useState(100);

    useEffect(() => {
        if (videoRef.current) {
            store.videoSrc = videoRef.current;
            const video = videoRef.current;

            videoRef.current.addEventListener('loadedmetadata', () => {
                if (containerRef.current) {
                    if (video.videoHeight > video.videoWidth) {
                        video.setAttribute('width', 'auto');
                        video.height = containerRef.current.clientHeight;
                        video.width = video.clientWidth;
                    }
                    if (video.videoHeight < video.videoWidth) {
                        // fill horizontally
                        video.setAttribute('height', 'auto');
                        video.width = containerRef.current.clientWidth;
                        video.height = video.clientHeight;
                    } else {
                        video.setAttribute('width', 'auto');
                        video.height = containerRef.current.clientHeight;
                        video.width = video.clientWidth;
                    }
                    console.info(video.width, video.height);
                    setVidHeight(video.height - 2);
                    setVidWidth(video.width)
                }
            });
        }
    }, [videoRef, containerRef, store]);

    return (
        <ViewerContainer ref={containerRef}>
            <SectionSelector
                width={vidWidth}
                height={vidHeight}
                onBoxChange={(x1: number, y1: number, x2: number, y2: number) => {
                    console.info(x1, y1, x2, y2);
                }}
            />
            <Video src={videoSrc} ref={videoRef} />
        </ViewerContainer>
    );
};
