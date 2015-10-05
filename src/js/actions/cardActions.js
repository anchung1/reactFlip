var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var cardActions = {
    addCards: function(count){
        AppDispatcher.handleAction({
            actionType: appConstants.ADD_CARDS,
            data: count
        });
    },

    memoryCards: function(count){
        AppDispatcher.handleAction({
            actionType: appConstants.MEMORY_CARDS,
            data: count
        });
    },

    newMemGame: function(count) {
        AppDispatcher.handleAction({
            actionType: appConstants.NEW_MEMORY_GAME,
            data: count
        });
    }

};

module.exports = cardActions;