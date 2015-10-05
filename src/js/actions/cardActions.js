var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var cardActions = {
    addCards: function(count){
        AppDispatcher.handleAction({
            actionType: appConstants.ADD_CARDS,
            data: count
        });
    }
};

module.exports = cardActions;