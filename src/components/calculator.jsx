import React, { Component } from 'react';
import CalculatorDisplay from './calculator-display';
import CalculatorKeys from './calculator-keys';

class Calculator extends React.Component {

    state = {
        display: '0'
    }

    handleDisplay = (display) => {
        this.setState({display});
    }

    render() { 
        const {display} = this.state; 
        return (
            <div>
                <CalculatorDisplay displayData={display} />
                <CalculatorKeys onDisplayChange={this.handleDisplay}  />
            </div>
        );
    }
}
 
export default Calculator;