var React = require('react');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//https://desandro.github.io/3dtransforms/docs/card-flip.html
var FlipComponent = React.createClass({
    getInitialState: function() {
        return {items: ['hello', 'world', 'click', 'me']};
    },

    render: function() {

        return (
            <div>
                <h3>Flip World</h3>


                <section className='container'>
                    <div id="card">
                        <figure className="front">3</figure>
                        <figure className="back">4</figure>
                    </div>
                </section>
            </div>
        );
    }
});

module.exports = FlipComponent;