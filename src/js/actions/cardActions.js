var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var restUrl = "https://localhost:30001/";

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
    },

    recordResult: function(score) {
        var url = restUrl + "api/daily";
        $.post(url, {name: "Nick", score: score}).then(
            function (data) {
                AppDispatcher.handleAction({
                    actionType: appConstants.NEW_RECORD,
                    data: data
                });
            },
            function () {

            }
        );
    }

};

module.exports = cardActions;