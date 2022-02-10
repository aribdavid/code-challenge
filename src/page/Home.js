import React from 'react';
import Input from '../components/Input';
import Result from '../components/Result';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 1
        }
    }
    handleCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1,
        }))
    }
    render() {
        const { counter } = this.state
        return (
            counter <= 4 ? <div>
                <h1>Calcule a quantidade de tinta necessária para pintar o seu cômodo:</h1>
                <h2>Digite as Medidas da parede {counter}:</h2>
                <Input message={`Parede ${counter}`} handleCounter={this.handleCounter} />

            </div> : <Result />
        )
    }
}

export default Home;