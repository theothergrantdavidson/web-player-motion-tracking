import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SectionSelector } from '../SectionSelector/SectionSelector';
import styled from 'styled-components';
import GlobalStore from '../GlobalStore';
import cv, { Rect, Point } from 'opencv-ts';

interface ViewerProps {
    videoSrc?: string;
    onSelection(r: Rect): void;
}

const ViewerContainer = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: black;
`;

const Video = styled.video``;

export const Viewer: React.FC<ViewerProps> = ({ videoSrc = '', onSelection }) => {
    const containerRef = useRef<HTMLDivElement | null>();
    const videoRef = useRef<HTMLVideoElement | null>();
    const store = GlobalStore.getInstance();

    const [vidWidth, setVidWidth] = useState(100);
    const [vidHeight, setVidHeight] = useState(100);

    const [containerHeight, setContainerHeight] = useState(0);

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
                    setVidHeight(video.height - 2);
                    setVidWidth(video.width);
                }
            });
        }
    }, [videoRef, containerRef, store, containerHeight]);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight);
        }
    }, [containerRef]);

    return (
        <ViewerContainer ref={containerRef}>
            <SectionSelector
                width={vidWidth}
                height={vidHeight}
                onBoxChange={(x1: number, y1: number, x2: number, y2: number) => {
                    const _x1 = x1 < x2 ? x1 : x2;
                    const _x2 = x1 > x2 ? x1 : x2;
                    const _y1 = y1 < y2 ? y1 : y2;
                    const _y2 = y1 > y2 ? y1 : y2;
                    
                    onSelection(new cv.Rect(_x1, _y1, Math.abs(_x1 - _x2), Math.abs(_y1 - _y2)));
                }}
            />
            <Video src={videoSrc} ref={videoRef} />
        </ViewerContainer>
    );
};
