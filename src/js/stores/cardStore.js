var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _store = {
    cardArray: [],
    dealtCards: []
};

var numCards = 52;
var rowCount = 13;
var init_done = false;

on_start();

function on_start() {
    if (init_done) return;

    _store.cardArray = [];
    for (var i=0; i<numCards; i++) {
        var elem = {id: "idcard"+i, class: "card card-sm"};
        var corner = calcImageOffset(i);
        elem.left = corner.left;
        elem.top = corner.top;
        elem.index = i;
        _store.cardArray.push(elem);
    }
    init_done = true;
}

function calcImageOffset(index) {
    var startX = 8;
    var startY = 8;

    var j = Math.floor(index/rowCount);
    var i = index % rowCount;

    var xpos = (startX + i*61) * -1;
    var ypos = (startY + j*81) * -1;

    return ({left: xpos, top: ypos});
}

function addCards(count) {

    if (!init_done) on_start();

    for (var i=0; i<count; i++) {
        var c = getRandomInt(0, _store.cardArray.length);
        var card = _store.cardArray[c];

        _.pullAt(_store.cardArray, c);
        _store.dealtCards.push(card);
    }
}


//min inclusive.. max exclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var cardStore = objectAssign({}, EventEmitter.prototype, {

    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getCards: function() {
        if (!init_done) on_start();

        return _store.dealtCards;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.ADD_CARDS:
            addCards(action.data);
            cardStore.emit(CHANGE_EVENT);
        default:
            return true;
    }
});

module.exports = cardStore;