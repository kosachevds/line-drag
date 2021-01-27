import React from 'react';
import Canvas from './Canvas';
import './styles.css';
import recordPage from "./images/recordPage.png"

const CM_PER_PX = 1 / 19.6;
const CM_UNITS = "cm"

function App() {
    return (
        <div className="App" style={{backgroundImage: `url(${recordPage})`}}>
            <Canvas
                widthCoefficient={CM_PER_PX}
                heightCoefficient={CM_PER_PX}
                widthUnit={CM_UNITS}
                heightUnit={CM_UNITS}
            />
        </div>
    );
}

export default App;