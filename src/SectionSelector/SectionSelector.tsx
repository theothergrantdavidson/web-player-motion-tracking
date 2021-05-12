import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const Host = styled.div`
    width: auto;
    height: auto;
    position: absolute;
    z-index: 10;
`;

const ViewBox = styled.svg`
    position: relative;
`;

export const SectionSelector: React.FC<{
    width: number;
    height: number;
    onBoxChange: (x1: number, y1: number, x2: number, y2: number) => void;
}> = ({ width, height, onBoxChange, ...props }) => {
    const polyLineRef = useRef<SVGPolylineElement | undefined>();
    const containerRef = useRef<HTMLDivElement | undefined>();
    const [mouseDown, setMouseDown] = useState(false);

    const [x1, setX1] = useState(0);
    const [x2, setX2] = useState(0);
    const [y1, setY1] = useState(0);
    const [y2, setY2] = useState(0);

    const enforceXValue = (n: number): number => {
        const rect = containerRef.current.getClientRects()[0];
        if (n < 0) return 0;
        if (n > rect.width) return rect.width;
        return Math.floor(n);
    };

    const enforceYValue = (n: number): number => {
        const rect = containerRef.current.getClientRects()[0];
        if (n < 0) return 0;
        if (n > rect.height) return rect.height;
        return n;
    };

    const onMousedown = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setMouseDown(true);

            const rect = containerRef.current.getClientRects()[0];
            const x1 = e.clientX - rect.left;
            const y1 = e.clientY - rect.top;

            setX1(x1);
            setX2(x1);
            setY1(y1);
            setY2(y1);
        },
        [containerRef, polyLineRef]
    );

    const onMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (mouseDown === true) {
                const rect = containerRef.current.getClientRects()[0];
                const x2 = e.clientX - rect.left;
                const y2 = e.clientY - rect.top;

                setX2(x2);
                setY2(y2);
            }
        },
        [containerRef, polyLineRef, mouseDown]
    );

    const onMouseLeave = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (mouseDown === true) {
                const rect = containerRef.current.getClientRects()[0];
                const x2 = e.clientX - rect.left;
                const y2 = e.clientY - rect.top;

                if (x2 > width) {
                    setX2(width);
                } else if (x2 < 0) {
                    setX2(0);
                } else {
                    setX2(x2);
                }

                if (y2 > height) {
                    setY2(height);
                } else if (y2 < 0) {
                    setY2(0);
                } else {
                    setY2(y2);
                }
                onBoxChange(
                    enforceXValue(x1),
                    enforceYValue(y1),
                    enforceXValue(x2),
                    enforceYValue(y2)
                );
                setMouseDown(false);
            }
        },
        [containerRef, polyLineRef, mouseDown, x1, x2, y2, y2]
    );

    const onMouseUp = useCallback(() => {
        if (mouseDown) {
            onBoxChange(enforceXValue(x1), enforceYValue(y1), enforceXValue(x2), enforceYValue(y2));
        }
        setMouseDown(false);
    }, [setMouseDown, mouseDown, x1, x2, y2, y2]);

    return (
        <Host
            ref={ref => (containerRef.current = ref)}
            onMouseDown={onMousedown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <ViewBox width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <polyline
                    ref={ref => (polyLineRef.current = ref)}
                    points={`${x1},${y1} ${x2},${y1} ${x2},${y2} ${x1},${y2} ${x1},${y1}`}
                    fill="rgba(39, 151, 211, 0.413)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke="white"
                />
            </ViewBox>
            {props.children}
        </Host>
    );
};
