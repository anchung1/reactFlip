var React = require('react');

var CardContainer = React.createClass({
//<div className="deck AceSpade"></div>
//<div className="deck KingHeart"></div>
        //<div className="deck Joker"></div>
        //<div className="deck Back"></div>


/*<section className="container">
    <div id="card" onClick={this.click}>
        <figure className="front">1</figure>
        <figure className="back">2</figure>
    </div>
</section>*/


    click: function() {
        console.log('clicked');
        $('#card').toggleClass('flipped');
    },

    render: function () {

        var threeSpade = {
            position: 'absolute',
            top: '50px',
            left: '450px',
            clip: 'rect(24px, 549px, 243px, 390px)'
        };

        var AceSpade = {
            position: 'absolute',
            top: '-350px',
            left: '182px',
            clip: 'rect(412px, 183px, 654px, 9px)'
        };

        var CardBack = {
            position: 'absolute',
            top: '-350px',
            left: '-182px',
            clip: 'rect(412px, 729px, 654px, 555px)'
        };

        var simpleStyle = {
            background: 'url(src/deck.jpg)'
        };
        return (

            <section className="container">
                <div id="card" onClick={this.click}>
                    <figure className="front">1</figure>
                    <figure className="back">2</figure>
                </div>
            </section>


        );
    }
});

module.exports = CardContainer;