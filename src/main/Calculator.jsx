import React, { Component, useEffect } from "react";
import './Calculator.css'

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue : '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}



export default class Calculator extends Component {

    state = {...initialState}


    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.squareRoot = this.squareRoot.bind(this);
    }

    squareRoot(){
        this.setOperation("=");
        const values = [...this.state.values];
        values[0] = Math.sqrt(values[0]).toFixed(8);
        this.setState({values});
    }

    clearMemory(){
      this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay : true})
        }else{
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [...this.state.values];

            switch (currentOperation) {
                case '+':
                    values[0] = values[0] + values[1];
                    break;

                case '-':
                    values[0] = values[0] - values[1];
                    break;

                case '*':               //÷
                    values[0] = values[0] * values[1];
                    break;

                case '/':               //÷
                    values[0] = values[0] / values[1];
                    break;
            
                default:
                    break;
            }

            
            values[1] = 0;

            this.setState({
                displayValue : values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;

        this.setState({displayValue, clearDisplay : false});

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values);
            
        }

        

        
    }

    render() {

        return (
            <div className="calculator" 
            onKeyDown={(event) => {
                try{
                    document.getElementById(event.key).click();
                }catch(e){
                    alert("Não é um comando valido!");
                }
                
                // console.log(event.key)
                // switch (event.key) {
                //     case "1":
                //     case "2":
                //     case "3":
                //     case "4":
                //     case "5":
                //     case "6":
                //     case "7":
                //     case "8":
                //     case "9":
                //     case "0":
                //     case "+":
                //     case "-":
                //     case "=":    
                //         document.getElementById(event.key).click();
                //         break;

                //     case "/":
                //         document.getElementById("÷").click();
                //         break;

                //     case "*":
                //         document.getElementById("×").click();
                //         break;

                //     case "Enter":
                //         document.getElementById("=").click();
                //         break;
                
                //     default:
                //         break;
                // }
            }}>
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} double></Button>
                <Button label="√" click={this.squareRoot} ></Button>
                <Button label="/" click={this.setOperation} operation></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit} ></Button>
                <Button label="9" click={this.addDigit} ></Button>
                <Button label="*" click={this.setOperation} operation></Button>
                <Button label="4" click={this.addDigit} ></Button>
                <Button label="5" click={this.addDigit} ></Button>
                <Button label="6" click={this.addDigit} ></Button>
                <Button label="-" click={this.setOperation} operation></Button>
                <Button label="1" click={this.addDigit} ></Button>
                <Button label="2" click={this.addDigit} ></Button>
                <Button label="3" click={this.addDigit} ></Button>
                <Button label="+" click={this.setOperation} operation></Button>
                <Button label="0" click={this.addDigit} double></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}