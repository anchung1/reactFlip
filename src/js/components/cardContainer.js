var React = require('react');

var CardContainer = React.createClass({


    render: function () {

        var threeSpade = {
            position: 'absolute',
            top: '50px',
            left: '450px',
            clip: 'rect(24px, 549px, 243px, 390px)'
        };

        return (
            <div>
                <div>
                    <img id="aceSpade" src="src/cards3x.jpg" />
                    <img id="twoSpade" src="src/cards3x.jpg" />
                    <img id="threeSpade" src="src/cards3x.jpg" style={threeSpade}/>

                </div>

            </div>

        );
    }
});

module.exports = CardContainer;