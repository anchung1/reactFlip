var React = require('react');
var cardAction = require('../actions/cardActions');

var GameOver = React.createClass({

    playClick: function () {
        cardAction.newMemGame(this.props.numCards);
    },

    render: function () {

        var reg = /High Score/;
        var scoreMsg = <div className="label label-primary">Turns to complete: {this.props.turns}</div>;
        if (reg.exec(this.props.msg)) {
            scoreMsg = <div className="label label-warning" style={{color: "black"}}>{this.props.msg} - Turns to complete: {this.props.turns}</div>;
        }

        return (

            <div className="container">
                <div className="royalflush"></div>
                {scoreMsg}
                <br/>
                <button className="btn btn-primary" onClick={this.playClick} style={{"marginTop": "3px"}}>Play Again</button>

            </div>


        );
    }
});

module.exports = GameOver;