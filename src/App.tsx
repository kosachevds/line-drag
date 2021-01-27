import React from 'react';
import Canvas from './Canvas';
import './styles.css';
import recordPage from "./images/recordPage.png"

const MM_PER_PX = 1.0 / 196.0;
const CM_UNITS = "cm"

function App() {
    return (
        <div className="App" style={{backgroundImage: `url(${recordPage})`}}>
            <Canvas
                widthCoefficient={MM_PER_PX * 10}
                heightCoefficient={MM_PER_PX * 10}
                widthUnit={CM_UNITS}
                heightUnit={CM_UNITS}
            />
        </div>
    );
}

export default App;