var React = require('react');
var SampleContainer = require('./components/SampleContainer');
var FlipContainer = require('./components/FlipContainer');
var CardContainer = require('./components/CardContainer');
var SmallCardContainer = require('./components/SmallCardContaier');

var App = React.createClass({
    render: function(){
        return (
            <div>
                <SmallCardContainer></SmallCardContainer>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
