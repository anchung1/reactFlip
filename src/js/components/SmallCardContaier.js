var React = require('react');
var _ = require('lodash');
var cardStore = require('../stores/cardStore');
var cardAction = require('../actions/cardActions');

var cardAdd = 52;
var SmallCardContainer = React.createClass({

    getInitialState: function() {
        return ({
            baseClass: []
        });
    },

    componentDidMount: function() {
        cardStore.addChangeListener(this._changeCB);
        cardAction.addCards(cardAdd);

    },

    componentWillUnmount: function() {
        cardStore.removeChangeListener(this._changeCB);
    },

    _changeCB: function() {
        var cards = cardStore.getCards();
        this.setState({
            baseClass: cards
        });
    },

    aceFlip: function(i) {

        /* use event.persist() to store event data
         * else data is wiped
         */

        var newClass = this.state.baseClass;

        var classes = newClass[i].class.split(' ');
        var index = _.findIndex(classes, function(chr) {
            return (chr=='flipped');
        });

        if (index < 0) {
            classes.push('flipped');
            newClass[i].class = classes.join(' ');
            this.setState({
                baseClass: newClass
            });
        } else {
            classes = _.without(classes, 'flipped');
            newClass[i].class = classes.join(' ');
            this.setState({
                baseClass: newClass
            })
        }

    },

    render: function () {

        var items = this.state.baseClass.map(function(acard, i) {
            var startTop = 25;
            var startLeft = 100;
            var rowCount = 7;

            var j = Math.floor(i/rowCount);
            var ii = i % rowCount;

            var top = (startTop + j*90);
            var left = (startLeft + ii*70);
            var style = {top: ""+top+"px", left: ""+left+"px"};

            var xpos = acard.left;
            var ypos = acard.top;

            var posValue = ""+xpos+"px " + ypos+"px";
            var style1 = {backgroundPosition: posValue};

            return(
                <div className={acard.class} onClick={this.aceFlip.bind(this,i)} style={style} key={acard.id}>
                    <div className="deck front-sm" style={style1}></div>
                    <div className="deck back-sm"></div>
                </div>
            )
        }.bind(this));

        return (

            <div className="container">
                {items}

            </div>


        );
    }
});

module.exports = SmallCardContainer;