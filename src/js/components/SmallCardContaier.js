var React = require('react');
var _ = require('lodash');

var numCards = 52;
var rowCount = 13;

var startX = 8;
var startY = 8;
function calcImageOffset(index) {
    var j = Math.floor(index/rowCount);
    var i = index % rowCount;

    var xpos = (startX + i*61) * -1;
    var ypos = (startY + j*81) * -1;

    return ({left: xpos, top: ypos});
}

var SmallCardContainer = React.createClass({

    getInitialState: function() {

        var cardArray = [];
        for (var i=0; i<numCards; i++) {
            var elem = {id: "idcard"+i, class: "card card-sm"};
            var corner = calcImageOffset(i);
            elem.left = corner.left;
            elem.top = corner.top;
            cardArray.push(elem);
        }

        console.log(cardArray);
        return ({
            baseClass: cardArray
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

    kingFlip: function() {
        $('#cardKing').toggleClass('flipped');
    },

    render: function () {

        var cards = [];
        cards.push({value: this.state.baseClass[2], index: 2});
        cards.push({value: this.state.baseClass[4], index: 4});
        cards.push({value: this.state.baseClass[6], index: 6});
        cards.push({value: this.state.baseClass[8], index: 8});


        var items = cards.map(function(acard, i) {


            var top = 300;
            var left = 100 + i*70;
            var style = {top: ""+top+"px", left: ""+left+"px"};

            var xpos = acard.value.left;
            var ypos = acard.value.top;

            var posValue = ""+xpos+"px " + ypos+"px";
            var style1 = {backgroundPosition: posValue};
            console.log(posValue);

            return(
                <div className={acard.value.class} onClick={this.aceFlip.bind(this,acard.index)} style={style} key={acard.value.id}>
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