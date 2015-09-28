var React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SampleComponent = React.createClass({
    getInitialState: function() {
        return {items: ['hello', 'world', 'click', 'me']};
    },
    handleAdd: function() {
        var newItems =
            this.state.items.concat([prompt('Enter some text')]);
        this.setState({items: newItems});
    },
    handleRemove: function(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    },
    render: function() {
        var items = this.state.items.map(function(item, i) {
            return (
                <div key={item} onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div>
                <h3>Hello World</h3>

                <button onClick={this.handleAdd}>Add Item</button>
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

module.exports = SampleComponent;