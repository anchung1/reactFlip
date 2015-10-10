var React = require('react');
var _ = require('lodash');
var cardStore = require('../stores/cardStore');
var cardAction = require('../actions/cardActions');
var SmallCards = require('./SmallCardContaier');
var Gameover = require('./GameOver');

var cardAdd = 52;
var memoryCards = 20;

var clickHistory = [];

var MemoryGame = React.createClass({

    getInitialState: function() {
        return ({
            cards: [],
            gameOver: true,
            scoreMsg: ''
        });
    },

    componentDidMount: function() {
        cardStore.addChangeListener(this._changeCB);
        cardStore.addScoreListener(this._scoreCB);

        //cardAction.newMemGame(memoryCards);

    },

    componentWillUnmount: function() {
        cardStore.removeChangeListener(this._changeCB);
        cardStore.removeScoreListener(this._scoreCB);

    },

    _changeCB: function() {

        this.matchCount = 0;
        this.numTurns = 0;

        var cards = cardStore.getCards();
        this.setState({
            cards: cards,
            gameOver: false
        });
    },
    _scoreCB: function () {
        var score = cardStore.getScore();
        this.setState({
            scoreMsg: score.msg
        });
    },

    handleFlip: function(i) {
        if (clickHistory.length >= 2) return;
        if (clickHistory.length == 1 && clickHistory[0] == i) return;

        var newClass = this.state.cards;

        var classes = newClass[i].class.split(' ');
        var index = _.findIndex(classes, function(chr) {
            return (chr=='flipped');
        });

        if (index < 0) {
            classes.push('flipped');
            newClass[i].class = classes.join(' ');

        } else {
            classes = _.without(classes, 'flipped');
            newClass[i].class = classes.join(' ');

        }

        this.setState({
            cards: newClass
        });

        clickHistory.push(i);
        if (clickHistory.length==2) {
            this.numTurns++;
            setTimeout(this.flipBack, 2000);

        }
    },

    flipBack: function() {

        var reg = /flipped/;
        var flipped = [];

        clickHistory.forEach(function(i) {
            var aCard = this.state.cards[i];
            flipped.push(aCard);

            if (!reg.exec(aCard.class)) {
                aCard.class += " flipped";
            }
        }.bind(this));

        //found match
        if (flipped[0].index == flipped[1].index) {
            flipped[0].show = false;
            flipped[1].show = false;

            this.matchCount++;
            if (this.matchCount == memoryCards) {
                cardAction.recordResult(this.numTurns);
                this.setState({
                    gameOver: true
                });
            }
        }

        //force update
        var cards = this.state.cards;
        this.setState({
            cards: cards
        });
        clickHistory = [];
    },

    render: function () {

        var element = <div></div>;
        if (this.state.gameOver) {
            element = <Gameover msg={this.state.scoreMsg} turns={this.numTurns} numCards={memoryCards}></Gameover>;
        } else {
            element = <SmallCards handler={this.handleFlip} cards={this.state.cards}></SmallCards>;
        }

        return(
            <div>
                {element}
            </div>
        );
    }

});

module.exports = MemoryGame;