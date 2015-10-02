var React = require('react');

var CardContainer = React.createClass({

    aceFlip: function() {
        $('#cardAce').toggleClass('flipped');
    },

    kingFlip: function() {
        $('#cardKing').toggleClass('flipped');
    },

    render: function () {

        return (

            <div className="container">
                <div className="card" id="cardAce" onClick={this.aceFlip} style={{top: '10%', left: '20%'}}>
                    <div id="Ace" className="deck front"></div>
                    <div className="deck back"></div>
                </div>

                <div className="card" id="cardKing" onClick={this.kingFlip} style={{top: '10%', left: '45%'}}>
                    <div id="King" className="deck front"></div>
                    <div className="deck back"></div>
                </div>
            </div>


        );
    }
});

module.exports = CardContainer;