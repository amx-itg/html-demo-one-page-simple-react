/* eslint-disable */
import './index.scss';
import { Button, Carousel } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import AmxNxLevel from '../AmnxLevel';
import AmxNxIcon from '../AmxNxIcon';
import AmxNxMuteButton from '../AmxNxMuteButton';

const AmxNxVolumeControls = (props) => {
    const [slideConfig, setSlideConfiguration] = useState(null);
    const sliderRef = useRef(null);
    useEffect(() => {
        let grid = props.configuration ? props.configuration : {};
        if (grid.port === undefined) { grid.port = 1 }
        if (grid.volumes === undefined) { grid.volumes = [] }
        if (grid.size === undefined) { grid.size = 3 }
        grid.justify = (grid.gridJustify !== undefined) ? grid.gridJustify : 'center';
        grid.slides = [];
        while (grid.volumes.length) {
            grid.slides.push(grid.volumes.splice(0, grid.size));
        }
        setSlideConfiguration(grid);
    }, [props.configuration]);

    const gotoNextSlide = useCallback(() => {
        sliderRef.current.next();
    }, [slideConfig]);

    const gotoPrevSlide = useCallback(() => {
        sliderRef.current.next();
    }, [slideConfig]);

    if (!slideConfig) return null;

    return (
        <div className="d-flex">
            {slideConfig.slides.length > 1 && <Button className="btn btn-secondary me-3" onClick={gotoPrevSlide}>
                <i className="bi bi-chevron-left"></i>
            </Button>}
            <div className="slider-container">
                <Carousel ref={sliderRef} data-bs-theme="light" interval={null} controls={false} indicators={false}>
                    {
                        slideConfig.slides.map((volumes, index) => (
                            <Carousel.Item key={index}>
                                <div className="row g-3 justify-content-center">
                                {
                                    volumes.map((volume, volIndex) => (
                                        <div className="col d-flex flex-column justify-content-center" key={volIndex}>
                                            <div className="">
                                                <AmxNxLevel configuration={{ ...volume.range, ...{ port: slideConfig.port } }} />
                                            </div>
                                                <AmxNxIcon configuration={{ ...volume.icon, ...{ port: slideConfig.port } }} />
                                            <div className="d-flex justify-content-center">
                                                <AmxNxMuteButton configuration={{ ...volume.btn, ...{ port: slideConfig.port } }} />
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </div>

            {slideConfig.slides.length > 1 && <Button className="btn btn-secondary ms-3" onClick={gotoNextSlide}>
                <i className="bi bi-chevron-right"></i>
            </Button>}
        </div>

    )
}

export default AmxNxVolumeControls;