import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import cv, { Mat } from 'opencv-ts';
import GlobalStore from './GlobalStore';

const Host = styled.div`
    width: 400px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: black;
`;

const DisplayCanvas = styled.canvas`
    &.verticalRatio {
        width: auto;
        height: 100%;
    }

    &.horizontalRatio {
        width: 100%;
        height: auto;
    }
`;

interface OutputDisplay {
    processFn(mat: Mat): Mat;
}

export const OutputDisplay: React.FC<OutputDisplay> = ({ processFn }) => {
    const [src, setSrc] = useState<HTMLVideoElement | undefined>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [ratio, setRatio] = useState('verticalRatio');
    const canvasRef = useRef<HTMLCanvasElement>();
    const store = GlobalStore.getInstance();
    const renderQueue: Mat[] = [];

    useEffect(() => {
        store.$srcBlob.subscribe(src => src && setIsPlaying(false));
    }, [store]);

    useEffect(() => {
        if (loaded && dataLoaded) {
            let delay = 0;
            const cap = new cv.VideoCapture(store.videoSrc);
            let frame = new cv.Mat(store.videoSrc.height, store.videoSrc.width, cv.CV_8UC4);

            const intervalId = setInterval(async () => {
                let begin = Date.now();
                if (isPlaying === true) {
                    try {
                        cap.read(frame);
                        renderQueue.push(frame);
                        const queueFrame = renderQueue.shift();

                        if (queueFrame) {
                            cv.imshow('render-out', queueFrame);
                        }
                    } catch (err) {
                        console.info(err);
                    }
                }
                delay = 1000 / 30 - (Date.now() - begin);
            }, delay);

            // Clear interval so dependcies are updated for the interval
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [dataLoaded, isPlaying, loaded]);

    useEffect(() => {
        if (src) {
            src.addEventListener('play', () => {
                setIsPlaying(true);
            });

            src.addEventListener('pause', () => {
                setIsPlaying(false);
            });

            src.addEventListener('loadeddata', function () {
                if (canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d');

                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                    if (store.videoSrc.videoHeight > store.videoSrc.videoWidth) {
                        setRatio('verticalRatio');
                    } else {
                        setRatio('horizontalRatio');
                    }
                }
                setDataLoaded(true);
            });
        }
    }, [src]);

    useEffect(() => {
        store.$videoSrc.subscribe(src => setSrc(src));

        cv.onRuntimeInitialized = () => {
            setLoaded(true);
        };
    });

    return (
        <Host>
            <DisplayCanvas className={ratio} ref={canvasRef} id="render-out" />
        </Host>
    );
};
