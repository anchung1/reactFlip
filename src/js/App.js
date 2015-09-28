var React = require('react');
var SampleContainer = require('./components/SampleContainer');
var FlipContainer = require('./components/FlipContainer');

var App = React.createClass({
    render: function(){
        return (

                <div>
                    <FlipContainer></FlipContainer>
                </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
