import React, { Component, useState } from 'react';
import { Transition } from 'react-transition-group';
import ColorPicker from "../ColorPicker/ColorPicker";

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    backgroundColor: 'red',
    borderWidth: 1,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const Fade = ({ in: inProp }) => (
    <Transition in={inProp} timeout={duration}>
        {state => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                I'm a fade Transition!
            </div>
        )}
    </Transition>
);

function App() {
    const [inProp, setInProp] = useState(false);
    return (
        <div>
            <Transition in={inProp} timeout={500}>
                (   <div>
                        <p>aaaaaa</p>
                    </div>
                )
            </Transition>
            <button onClick={() => setInProp(true)}>
                Click to Enter
            </button>
        </div>
    );
}

export default App;
