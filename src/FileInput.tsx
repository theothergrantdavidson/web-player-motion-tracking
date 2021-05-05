import React, { useCallback } from 'react';
import styled from 'styled-components';

const Input = styled.input``;

export const FileInput: React.FC<{ onFileSelect(src: string): void }> = ({ onFileSelect }) => {
    const onInputChangeCb = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const fileBLob = new Blob([e.target.files[0]], {
                type: e.target.files[0].type,
            });
            const url = (window.URL ? URL : webkitURL).createObjectURL(fileBLob);
            onFileSelect(url);
        },
        []
    );
    return (
        <>
            <Input type="file" onChange={onInputChangeCb} />
        </>
    );
};
