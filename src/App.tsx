import React from 'react';
import Measurer from './Canvas';
import './styles.css';
import recordPage from "./images/recordPage.png"

const MM_PER_PX = 1.0 / 1.96;
const MM_PER_MV = 10;
const MM_PER_SEC = 25;
const MV_PER_PX = MM_PER_PX / MM_PER_MV;
const SEC_PER_PX = MM_PER_PX / MM_PER_SEC;

enum Units {
    Centimeters = "cm",
    Millivolts = "mV",
    Seconds = "sec",
}

function App() {
    return (
        <div className="App" style={{backgroundImage: `url(${recordPage})`}}>
            <Measurer
                widthCoefficient={SEC_PER_PX}
                heightCoefficient={MV_PER_PX}
                widthUnit={Units.Seconds}
                heightUnit={Units.Millivolts}
            />
        </div>
    );
}

export default App;