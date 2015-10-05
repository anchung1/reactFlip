var React = require('react');
var _ = require('lodash');
var cardStore = require('../stores/cardStore');
var cardAction = require('../actions/cardActions');
var SmallCards = require('./SmallCardContaier');

var cardAdd = 52;
var memoryCards = 10;

var clickHistory = [];

var MemoryGame = React.createClass({

    getInitialState: function() {
        this.testVal = 5;
        return ({
            cards: []
        });
    },

    componentDidMount: function() {
        cardStore.addChangeListener(this._changeCB);
        cardAction.memoryCards(memoryCards);

    },

    componentWillUnmount: function() {
        cardStore.removeChangeListener(this._changeCB);
    },

    _changeCB: function() {
        var cards = cardStore.getCards();
        this.setState({
            cards: cards
        });
    },

    handleFlip: function(i) {
        if (clickHistory.length >= 2) return;

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
            setTimeout(this.flipBack, 3000);

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
            console.log('found match: ' + flipped[0].index);
            flipped[0].show = false;
            flipped[1].show = false;
        }

        //force update
        var cards = this.state.cards;
        this.setState({
            cards: cards
        });
        clickHistory = [];
    },

    render: function () {

        return(
            <SmallCards handler={this.handleFlip} cards={this.state.cards}></SmallCards>
        );
    }

});

module.exports = MemoryGame;