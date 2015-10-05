var React = require('react');
var cardAction = require('../actions/cardActions');

var GameOver = React.createClass({

    playClick: function() {
        cardAction.newMemGame(this.props.numCards);
    },

    render: function () {

        return (

            <div className="container">
                <div className="royalflush"></div>
                <div className="label label-primary">Turns to complete: {this.props.turns}</div>
                <br/>
                <button className="btn btn-primary" onClick={this.playClick} style={{"marginTop": "3px"}}>Play Again</button>

            </div>


        );
    }
});

module.exports = GameOver;