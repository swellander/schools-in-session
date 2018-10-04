import React from "react";
import { IconButton } from '@material-ui/core';
import Webcam from "react-webcam";
import AccountCircle from '@material-ui/icons/AccountCircle';


class Camera extends React.Component {
    constructor() {
        super();
        this.state = {
            camera: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('clicked')
        this.setState({ camera: true });

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
                        <Webcam style={{ marginTop: '-90px', marginLeft: '-200px' }} />
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