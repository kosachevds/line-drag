import React from 'react';
import Canvas from './Canvas';
import './styles.css';
import recordPage from "./images/recordPage.png"

function App() {
    return (
        <div className="App" style={{backgroundImage: `url(${recordPage})`}}>
            <Canvas />
        </div>
    );
}

export default App;