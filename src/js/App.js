var React = require('react');
var SampleContainer = require('./components/SampleContainer');
var FlipContainer = require('./components/FlipContainer');
var CardContainer = require('./components/CardContainer');

var App = React.createClass({
    render: function(){
        return (
            <div>
                <CardContainer></CardContainer>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
