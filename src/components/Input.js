import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import defaultAction from '../store/actions'

const door = { width: 0.8, height: 1.9 };
const window = { width: 2, height: 1.2 };

class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            altura: 0,
            largura: 0,
            janelas: 0,
            portas: 0,
            error: false,
            error2: false,
            areaTotal: 0,
        }
    }

    wallValidator = () => {
        const { altura, largura, janelas, portas } = this.state;
        const hundread = 100;
        const areaParede = (altura / hundread * largura / hundread);
        const areaJanelas = (window.width * window.height) * janelas;
        const areaPortas = (door.width * door.height) * portas;
        if (areaJanelas + areaPortas > areaParede / 2) {
            this.setState({ error2: true })
        } else if (areaParede > 15 || areaParede < 1) {
            this.setState({ error: true })
        } else if (portas !== 0 && altura < 220  ) {
            this.setState({ error: true })
        } else {
            this.setState({
                areaTotal: areaParede - areaPortas - areaJanelas,
                error: false,
                error2: false
            })
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value }, () => this.wallValidator())
    }

    alertUser = () => {
        const { handleCounter, dispatchWallInfo } = this.props;
        const { error, error2, areaTotal } = this.state
        if (error) {
            alert('A parede deve ter área entre 1m² e 15m²');
        } else if (error2) {
            alert('Digite Uma Quantidade de Janelas ou Portas válido');
        }
        else if (!error || !error2) {
            handleCounter();
            this.setState({
                altura: 0,
                largura: 0,
                janelas: 0,
                portas: 0,
            })
            dispatchWallInfo(areaTotal)

        }
    }
    render() {
        const { message } = this.props;
        const { altura, largura, janelas, portas } = this.state;
        return (
            <div>
                <label htmlFor='largura'>
                    Largura {message} (Cm)
                    <input
                        value={largura}
                        onChange={this.handleChange}
                        name='largura'
                        type='number' />
                </label>
                <label htmlFor='altura'>
                    Altura {message}
                    <input
                        value={altura}
                        onChange={this.handleChange}
                        name='altura'
                        type='number' />
                </label>
                <label htmlFor='portas'>
                    Quantidade de portas:
                    <input
                        value={portas}
                        onChange={this.handleChange}
                        name='portas'
                        type='number' />
                </label>
                <label htmlFor='janelas'>
                    Quantidade de janelas:
                    <input
                        value={janelas}
                        onChange={this.handleChange}
                        name='janelas'
                        type='number' />
                </label>
                <button onClick={this.alertUser} type="button">Próximo</button>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    dispatchWallInfo: (state) => dispatch(defaultAction(state, 'SAVE_WALL')),
});

Input.propTypes = {
    dispatchWallInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Input);