import React from 'react';

class CalculatorDisplay extends React.Component {

    render() { 
        const {displayData} = this.props;
        return <div className="calculator-display">{displayData}</div>;
    }
}
 
export default CalculatorDisplay;