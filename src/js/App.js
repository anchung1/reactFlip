var React = require('react');
var SampleContainer = require('./components/SampleContainer');
var FlipContainer = require('./components/FlipContainer');
var CardContainer = require('./components/CardContainer');
var SmallCardContainer = require('./components/SmallCardContainer');
var MemoryGame = require('./components/MemoryGame');


var App = React.createClass({
    render: function () {
        return (
            <div>
                <MemoryGame></MemoryGame>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
