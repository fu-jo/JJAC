import React, { useEffect } from 'react';
import useStorage from '../Hooks/useStorage'
import { ProgressBar } from 'react-bootstrap'

const Progress = ({ file, setFile, setImgUrl }) => {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
            setImgUrl(url)
        }
    }, [url, setFile])

    return (
        <ProgressBar now={progress}/>
    );
};



export default Progress;