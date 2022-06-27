import React, { useEffect, useState } from 'react';

const CalculatorKeys = ({onDisplayChange}) => {
    const [display, setDisplay] = useState('0');
    const [previousKey, setPreviousKey] = useState('');
    const [operator, setOperator] = useState('');
    const [previousDisplay, setPreviousDisplay] = useState('');

    const operators = ['+', '-', '*', '/'];

    const handleDisplayChange = () => {
        onDisplayChange(display);
    }

    const handleOperatorEventKey = element => {
        const action = element.target.value;
        const isPreviousKeyOperator = operators.filter(op => op === previousKey).length;

        if (!isPreviousKeyOperator) {
            if (previousKey !== '' && previousDisplay !== '' && operator !== '') {
                const newDisplay = calculate(previousDisplay, operator, display);

                setDisplay(newDisplay);
                setPreviousDisplay(display);
                handleDisplayChange();
            } else {
                setPreviousDisplay(display);
            }
        }
        setOperator(action);
        setPreviousKey(action);
    }

    const handleNumberEventKey = element => {
        const value = element.target.value;
        const isPreviousKeyOperator = operators.filter(op => op === previousKey).length;
        
        if (isPreviousKeyOperator || display === '0') {
            setDisplay(value);
        } else {
            setDisplay(display + value);
        }

        setPreviousKey(value);
    }

    const handleDecimalEventKey = element => {
        const value = element.target.value;
        if (!display.includes(value)) {
            setDisplay(display + value);
            setPreviousKey(value);
        }
    }

    const handleClearEventKey = () => {
        setDisplay('0');
        setPreviousKey('');
        setOperator('');
        setPreviousDisplay('');
    }

    const handleEqualsEventKey = () => {
        if (display !== '0' && previousDisplay !== '' && operator !== '') {
            const newDisplay = calculate(previousDisplay, operator, display);
            setDisplay(newDisplay);
            setPreviousDisplay('');
            setOperator('');
            setPreviousKey('');
        }
    }

    const calculate = (num1, operator, num2) => {
        const firstNum = parseFloat(num1); 
        const secNum = parseFloat(num2);

        if (operator === '+') return firstNum + secNum;
        if (operator === '-') return firstNum - secNum;
        if (operator === '*') return firstNum * secNum;
        if (operator === '/') return firstNum / secNum;
    }

    const keys = [
        { label: "+", value: "+", handler: handleOperatorEventKey, className: "key-operator"},
        { label: "-", value: "-", handler: handleOperatorEventKey, className: "key-operator"},
        { label: "×", value: "*", handler: handleOperatorEventKey, className: "key-operator"},
        { label: "÷", value: "/", handler: handleOperatorEventKey, className: "key-operator"},
        { label: "7", value: "7", handler: handleNumberEventKey},
        { label: "8", value: "8", handler: handleNumberEventKey},
        { label: "9", value: "9", handler: handleNumberEventKey},
        { label: "4", value: "4", handler: handleNumberEventKey},
        { label: "5", value: "5", handler: handleNumberEventKey},
        { label: "6", value: "6", handler: handleNumberEventKey},
        { label: "1", value: "1", handler: handleNumberEventKey},
        { label: "2", value: "2", handler: handleNumberEventKey},
        { label: "3", value: "3", handler: handleNumberEventKey},
        { label: "0", value: "0", handler: handleNumberEventKey},
        { label: ".", value: ".", handler: handleDecimalEventKey},
        { label: "AC", value: "clear", handler: handleClearEventKey},
        { label: "=", value: "calc", handler: handleEqualsEventKey, className: "key-equal"}
    ];
    
    useEffect(() => handleDisplayChange(), [display]);

    return (
        <div className="calculator-keys">
            { keys.map(key => 
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
 
export default CalculatorKeys;