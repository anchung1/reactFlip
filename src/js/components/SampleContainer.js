var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SampleComponent = React.createClass({

    getInitialState: function() {
        return {items: ['hello', 'world', 'click', 'on', 'me']};
    },

    handleRemove: function(i) {

    },
    render: function(){
        var items = this.state.items.map(function(item, i) {
            return(
                <div key={item} onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            )
        }.bind(this));

        return (
            <div>
                <h3>Hello World</h3>
                <ReactCSSTransitionGroup transitionName='example'>{items}</ReactCSSTransitionGroup>
            </div>
        )
    }
});

module.exports = SampleComponent;