import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Player } from './Player/Player';
import cv, { Mat, Rect, Scalar, Size, TermCriteria } from 'opencv-ts';
import { OutputDisplay } from './OutputDisplay';
import GlobalStore from './GlobalStore';

const Host = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
`;

const OutContainer = styled.div`
    width: 500px;
    height: 400px;
`;

export const App: React.FC = () => {
    const [rect, setRect] = useState<Rect>();
    const [loaded, setLoaded] = useState(false);
    const store = GlobalStore.getInstance();
    const [vidSrc, setVidSrc] = useState<HTMLVideoElement>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);

    // Setup function
    let [frame, hsv, hsvVec, roiHist, dst, trackWindow, termCrit] = useMemo(() => {
        if (loaded && rect && rect.width > 0 && rect.height > 0) {
            let cap = new cv.VideoCapture(vidSrc);

            // take first frame of the video
            let frame = new cv.Mat(vidSrc.height, vidSrc.width, cv.CV_8UC4);
            cap.read(frame);

            // hardcode the initial location of window
            let trackWindow = new cv.Rect(rect);

            // set up the ROI for tracking
            let roi = frame.roi(trackWindow);
            let hsvRoi = new cv.Mat();
            cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
            cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);
            let mask = new cv.Mat();
            let lowScalar = new cv.Scalar(30, 30, 0);
            let highScalar = new cv.Scalar(180, 180, 180);
            let low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
            let high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
            cv.inRange(hsvRoi, low, high, mask);
            let roiHist = new cv.Mat();
            let hsvRoiVec = new cv.MatVector();
            hsvRoiVec.push_back(hsvRoi);
            cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
            cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

            // delete useless mats.
            roi.delete();
            hsvRoi.delete();
            mask.delete();
            low.delete();
            high.delete();
            hsvRoiVec.delete();

            // Setup the termination criteria, either 10 iteration or move by atleast 1 pt
            let termCrit = new cv.TermCriteria(
                cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT,
                10,
                1
            );

            let hsv = new cv.Mat(vidSrc.height, vidSrc.width, cv.CV_8UC3);
            let dst = new cv.Mat();
            let hsvVec = new cv.MatVector();
            hsvVec.push_back(hsv);

            return [frame, hsv, hsvVec, roiHist, dst, trackWindow, termCrit];
        }
        return [];
    }, [loaded, rect, vidSrc]);

    const processMat = useCallback(
        (mat: Mat): Mat => {
            cv.cvtColor(mat, hsv, cv.COLOR_RGBA2RGB);
            cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
            cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);
    
            // Apply meanshift to get the new location
            // and it also returns number of iterations meanShift took to converge,
            // which is useless in this demo.
            [, trackWindow] = cv.meanShift(dst, trackWindow, termCrit);
    
            // Draw it on image
            let [x, y, w, h] = [trackWindow.x, trackWindow.y, trackWindow.width, trackWindow.height];
            cv.rectangle(mat, new cv.Point(x, y), new cv.Point(x+w, y+h), [255, 0, 0, 255], 2);

            return mat;
        },
        [rect, hsv, hsvVec, roiHist, dst, trackWindow, termCrit]
    );

    cv.onRuntimeInitialized = () => {
        store.cvLoaded = true;
        setLoaded(true);
    };

    useEffect(() => {
        store.$videoSrc.subscribe(setVidSrc);
        store.$isPlaying.subscribe(setIsPlaying);
    }, []);

    return (
        <Host>
            <Player onSelection={setRect} />
            <OutContainer>
                <OutputDisplay processFn={processMat} processDeps={[rect, hsv, hsvVec, roiHist, dst, trackWindow, termCrit]} />
            </OutContainer>
        </Host>
    );
};
