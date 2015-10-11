var React = require('react');

var numCards = 0;
var colCount = 0;
var SmallCardContainer = React.createClass({

    render: function () {

        //calcDimension(this.props.cards.length);
        if (numCards != this.props.cards.length) {
            numCards = this.props.cards.length;
            colCount = Math.floor(Math.sqrt(numCards) * 1.25);

        }

        var items = this.props.cards.map(function(acard, i) {

            if (acard.show == false) return;
            var startTop = 25;
            var startLeft = 100;
            //var colCount = 7;

            var j = Math.floor(i/colCount);
            var ii = i % colCount;

            var top = (startTop + j*90);
            var left = (startLeft + ii*70);
            var style = {top: ""+top+"px", left: ""+left+"px"};

            var xpos = acard.left;
            var ypos = acard.top;

            var posValue = ""+xpos+"px " + ypos+"px";
            var style1 = {backgroundPosition: posValue};

            //on bind(this, i) get error bind(): React component methods may only be bound to the component instance.
            //google search suggested bind(null, i)
            return(
                <div className={acard.class} onClick={this.props.handler.bind(null,i)} style={style} key={acard.id}>
                    <div className="deck front-sm" style={style1}></div>
                    <div className="deck back-sm"></div>
                </div>
            )
        }.bind(this));

        return (

            <div className="container">
                {items}
            </div>


        );
    }
});

module.exports = SmallCardContainer;