import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const gallonSize = [18, 3.6, 2.5, 0.5]

class Result extends React.Component {
    render() {
        const { paredes } = this.props;
        const areaComodo = paredes.reduce((acc, elem) => {
            return acc + elem;
        }, 0).toFixed(2);
        const totalTinta = areaComodo / 5;
        const galaoCorreto = gallonSize.reduce((acc, elem) => {
            return Math.abs(elem - totalTinta) < Math.abs(acc - totalTinta) ? elem : acc;
        });

        const resultado = (totalTinta / galaoCorreto).toFixed();
        const resto = totalTinta % galaoCorreto;
        const galaoProximo = gallonSize.reduce((acc, elem) => {
            return Math.abs(elem - resto) < Math.abs(acc - resto) ? elem : acc;
        });
        const resultado2 = (resto / galaoProximo).toFixed();

        return (
            <div>
                <h2>A área total de seu cômodo é: { areaComodo }m²</h2>
                <h3>A quantidade necessária de tinta é: { resultado } lata(s) de { galaoCorreto }L 
                {resto > 0 && ` e ${ resultado2 } lata(s) de ${ galaoProximo } Litros`}
                </h3>

            </div>
        )
    }
}

Result.propTypes = {
    paredes: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    paredes: state.wallReducer.paredes,
});

export default connect(mapStateToProps, null)(Result);

