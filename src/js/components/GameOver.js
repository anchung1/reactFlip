var React = require('react');
var cardAction = require('../actions/cardActions');

var ENTER_KEY = 13;
var currentPlayer = '';

var GameOver = React.createClass({

    componentDidMount: function() {
        //this.refs.nameInput.getDOMNode().focus();
    },

    playClick: function () {
        cardAction.newMemGame(this.props.numCards);
    },

    namePress: function(event) {
        var name;
        if (event.type == 'blur') {
            name = this.refs.nameInput.getDOMNode().value;
            this.props.handler({type: 'name', value: name});

        } else if (event.type == 'keypress') {
            if (event.which == ENTER_KEY) {
                name = this.refs.nameInput.getDOMNode().value;
                this.props.handler({type: 'name', value: name});
            }
        }

    },

    cardNumPress: function(event) {
        var numCards;
        if (event.type == 'blur') {
            numCards = this.refs.cardNumInput.getDOMNode().value;
            this.props.handler({type: 'numCards', value: numCards});

        } else if (event.type == 'keypress') {
            if (event.which == ENTER_KEY) {
                numCards = this.refs.cardNumInput.getDOMNode().value;
                this.props.handler({type: 'numCards', value: numCards});

                $('#collapseExample').attr("class", "collapse");
            }
        }

    },

    onConfigure: function(event) {
        if (this.props.name) this.refs.nameInput.getDOMNode().value = this.props.name;
        //if (this.props.numCards) this.refs.cardNumInput.getDOMNode().value = this.props.numCards;

        this.refs.nameInput.getDOMNode().focus();
        this.refs.nameInput.getDOMNode().select();
    },

    render: function () {
        var reg, scoreMsg, cardConfig;
        var inputStyle = {background: "beige", color: "indigo"};
        var numCardsPlaceholder = 'Match cards (1..52)';

        scoreMsg = <div></div>;
        reg = /High Score/;

        var thisPlayer = this.props.name;

        console.log(this.props.turns);
        if ( !this.props.turns ) {
            if (!this.props.name) {
                scoreMsg = <div className="label label-primary">Click 'Configure' to set your name and game.</div>
            } else {
                scoreMsg = <div className="label label-primary">Hi {this.props.name} Click 'Play' or 'Configure'</div>
                currentPlayer = this.props.name;
            }
        } else {

            if (thisPlayer == currentPlayer) {
                scoreMsg = <div className="label label-primary">{this.props.name}: Turns to complete: {this.props.turns}</div>;
                if (reg.exec(this.props.msg)) {
                    scoreMsg = <div className="label label-warning" style={{color: "black"}}>{this.props.name}: {this.props.msg} - Turns to complete: {this.props.turns}</div>;
                }
            } else {
                scoreMsg = <div className="label label-primary">Welcome {this.props.name}</div>
                currentPlayer = this.props.name;
            }

        }


        return (

            <div className="container">
                <div className="royalflush"></div>
                {scoreMsg}
                <br/>
                <button className="btn btn-primary" onClick={this.playClick} style={{"marginTop": "3px"}}>Play Again</button>
                <div style={{position: "absolute", left: "85%", top: "1%"}}>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" onClick={this.onConfigure}>Configure</button>
                    <div className="collapse" id="collapseExample">
                        <div className="list-group" style={{position: "absolute", left:"-50%"}}>
                            <a className="list-group-item" style={{backgroundColor: "transparent"}}>
                                <input type="text" placeholder="Player Name" onKeyPress={this.namePress}
                                       onBlur={this.namePress} ref="nameInput" style={inputStyle}/>
                            </a>
                            <a className="list-group-item" style={{backgroundColor: "transparent"}}>
                                <input type="text" placeholder={numCardsPlaceholder} onKeyPress={this.cardNumPress}
                                       onBlur={this.cardNumPress} ref="cardNumInput" style={inputStyle}/>
                            </a>
                        </div>
                    </div>
                </div>


            </div>


        );
    }
});

module.exports = GameOver;