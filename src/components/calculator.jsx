import React, { useState } from 'react';
import CalculatorDisplay from './calculator-display';
import CalculatorKeys from './calculator-keys';

const Calculator = () => {
    const [display, setDisplay] = useState('0');


    const handleDisplay = (display) => {
        setDisplay(display);
    }

    return (
        <div>
            <CalculatorDisplay displayData={display} />
            <CalculatorKeys onDisplayChange={handleDisplay}  />
        </div>
    );
}
 
export default Calculator;