import React from "react";
import { IconButton } from '@material-ui/core';
import Webcam from "react-webcam";
import AccountCircle from '@material-ui/icons/AccountCircle';


class Camera extends React.Component {
    constructor() {
        super();
        this.state = {
            camera: false,
            image: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.capture = this.capture.bind(this);
        this.setRef = this.setRef.bind(this);
    }
    handleClick() {
        if (this.state.camera) this.capture();
        else this.setState({ camera: true });
    }
    setRef(webcam) {
        this.webcam = webcam;
    }
    capture() {
        const image = this.webcam.getScreenshot();
        this.setState({ image })
    }
    render() {
        const cameraStyles = {
            overflow: 'hidden',
            borderRadius: 500,
            height: 230,
            width: 230,
        }
        return (
            <IconButton onClick={this.handleClick}>
                {this.state.camera ? (
                    <div style={cameraStyles}>
                        {this.state.image.length > 0 ? (
                            <img
                                style={{ marginTop: '-30px', marginLeft: '-200px' }}
                                src={this.state.image}
                            />
                        )
                            : (
                                <Webcam
                                    style={{ marginTop: '-90px', marginLeft: '-200px' }}
                                    ref={this.setRef}
                                    screenshotFormat="image/jpeg"
                                />
                            )}
                    </div>
                )
                    :
                    (
                        <AccountCircle
                            style={{
                                fontSize: 230
                            }}
                        />
                    )}
            </IconButton>
        );
    }
}

export default Camera;