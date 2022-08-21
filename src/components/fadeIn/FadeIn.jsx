import React, {useState, useEffect} from "react";

import { Transition } from 'react-transition-group'


const FadeIn = ({ children, duration = 400, timeout = 300 }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setShow(true)
        }, timeout);

        return () => clearTimeout(showTimer);
    }, [])

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0, 
       
    }

    const transitionStyles = {
        entering: {opacity: 0},
        entered: {
            opacity: 0,
            transform: "scale(0.9)"
        },
        exiting: {
            opacity: 1,
            transform: "scale(1)"
        },
        exited: {
            opacity: 1,
            // transform: "scale(1)"
        },
    };
    
    return (
        <Transition in={!show} timeout={ duration } >
        {state => (
        <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
        }}>
            { children }
        </div>
        )}
        </Transition>
    )
};
    
export default FadeIn;