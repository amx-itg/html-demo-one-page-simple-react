/* eslint-disable */
import React from "react";
import { Button, Carousel } from "react-bootstrap";
import AmxNxButton from "../AmxNxButton";
import { useCallback, useEffect, useRef, useState } from "react";

const AmNxPresetButtons = (props) => {
    const [slideConfig, setSlideConfiguration] = useState(null);
    const sliderRef = useRef(null);
    useEffect(() => {
        let grid = props.configuration ? props.configuration : {};
        if (grid.port === undefined) { grid.port = 1 }
        if (grid.btns === undefined) { grid.btns = [] }
        if (grid.size === undefined) { grid.size = 8 }
        grid.justify = (grid.gridJustify !== undefined) ? grid.gridJustify : 'center';
        grid.slides = [];
        while (grid.btns.length) {
            grid.slides.push(grid.btns.splice(0, grid.size));
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
            </Button> }
            <div className="slider-container">
                <Carousel ref={sliderRef} data-bs-theme="light" interval={null} controls={false} indicators={false}>
                    {
                        slideConfig.slides.map((buttons, index) => (
                            <Carousel.Item key={index}>
                                <div className="row g-3 justify-content-center">
                                    {buttons.map((btn, btnIndex) => (
                                        <div
                                            className={`col-3 d-flex justify-content-center`}
                                            key={btnIndex}
                                        >
                                            <AmxNxButton configuration={{ ...btn, ...{ port: slideConfig.port } }} />
                                        </div>

                                    ))}
                                </div>

                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </div>
            
            {slideConfig.slides.length > 1 && <Button className="btn btn-secondary ms-3" onClick={gotoNextSlide}>
                <i className="bi bi-chevron-right"></i>
            </Button> }
        </div>
    )
}

export default AmNxPresetButtons;