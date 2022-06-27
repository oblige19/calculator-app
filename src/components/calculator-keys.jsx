import React, { Component } from 'react';

class CalculatorKeys extends Component {

    state = {
        display: '0',
        previousKey: '',
        operator: '',
        previousDisplay: ''
    }

    operators = ['+', '-', '*', '/'];

    handleDisplayChange = () => {
        this.props.onDisplayChange(this.state.display);
    }

    handleOperatorEventKey = (element) => {
        const action = element.target.value;
        let {previousKey, operator, previousDisplay, display} = this.state;
        const isPreviousKeyOperator = this.operators.filter(op => op === previousKey).length;
        if (isPreviousKeyOperator) {
            this.setState({...this.state, operator: action, previousKey: action});
        } else {
            if (previousKey !== '' && previousDisplay !== '' && operator !== '') {
                const newDisplay = this.calculate(previousDisplay, operator, display);
                this.setState(
                    {...this.state, display: newDisplay, previousDisplay: display, operator: action, previousKey: action}, 
                    () => this.handleDisplayChange()
                );
            } else {
                this.setState({...this.state, previousDisplay: display, operator: action, previousKey: action});
            }
        }
    }

    handleNumberEventKey = element => {
        const value = element.target.value;
        let {display, previousKey} = this.state;
        const isPreviousKeyOperator = this.operators.filter(op => op === previousKey).length;
        
        if (isPreviousKeyOperator || display === '0') {
            display = value;
        } else {
            display += value;
        }

        this.setState({...this.state, display: display, previousKey: value}, () => this.handleDisplayChange());
    }

    handleDecimalEventKey = (element) => {
        const value = element.target.value;
        if (!this.state.display.includes(value)) {
            this.setState({display: this.state.display + value, previousKey: value}, () => this.handleDisplayChange());
        }
    }

    handleClearEventKey = (element) => {
        this.setState({display: '0', previousDisplay: '', operator: '', previousKey: ''}, () => this.handleDisplayChange());
    }

    handleEqualsEventKey = () => {
        const {display, previousDisplay, operator} = this.state;
        console.log('state',this.state);
        if (display !== '0' && previousDisplay !== '' && operator !== '') {
            const newDisplay = this.calculate(previousDisplay, operator, display);
            this.setState(
                {...this.state, display: newDisplay, previousDisplay: '' , operator: '', previousKey: ''}, 
                () => this.handleDisplayChange()
            );
        }
    }

    calculate = (num1, operator, num2) => {
        const firstNum = parseFloat(num1); 
        const secNum = parseFloat(num2);

        if (operator === '+') return firstNum + secNum;
        if (operator === '-') return firstNum - secNum;
        if (operator === '*') return firstNum * secNum;
        if (operator === '/') return firstNum / secNum;
    }

    keys = [
        { label: "+", value: "+", handler: this.handleOperatorEventKey, className: "key-operator"},
        { label: "-", value: "-", handler: this.handleOperatorEventKey, className: "key-operator"},
        { label: "×", value: "*", handler: this.handleOperatorEventKey, className: "key-operator"},
        { label: "÷", value: "/", handler: this.handleOperatorEventKey, className: "key-operator"},
        { label: "7", value: "7", handler: this.handleNumberEventKey},
        { label: "8", value: "8", handler: this.handleNumberEventKey},
        { label: "9", value: "9", handler: this.handleNumberEventKey},
        { label: "4", value: "4", handler: this.handleNumberEventKey},
        { label: "5", value: "5", handler: this.handleNumberEventKey},
        { label: "6", value: "6", handler: this.handleNumberEventKey},
        { label: "1", value: "1", handler: this.handleNumberEventKey},
        { label: "2", value: "2", handler: this.handleNumberEventKey},
        { label: "3", value: "3", handler: this.handleNumberEventKey},
        { label: "0", value: "0", handler: this.handleNumberEventKey},
        { label: ".", value: ".", handler: this.handleDecimalEventKey},
        { label: "AC", value: "clear", handler: this.handleClearEventKey},
        { label: "=", value: "calc", handler: this.handleEqualsEventKey, className: "key-equal"}
    ];

    render() { 
        return (
            <div className="calculator-keys">
                { this.keys.map(key => 
                    <button className={key.className} 
                            value={key.value}
                            key={key.label}
                            onClick={ key.handler }
                            >
                        {key.label}
                    </button>
                    )
                }
            </div>
        );
    }
}
 
export default CalculatorKeys;