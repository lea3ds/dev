import React from 'react'
import './index.css'
import CircularProgress from "@material-ui/core/CircularProgress";

let Loader = () =>
        <div className="loader-container">
            <CircularProgress className="circular-progress" />
        </div>;

export default Loader