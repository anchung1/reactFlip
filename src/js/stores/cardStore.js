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

init_cards();

function init_cards() {

    _store.cardArray = [];
    _store.dealtCards = [];

    for (var i=0; i<numCards; i++) {
        var elem = {id: "idcard"+i, class: "card card-sm flipped"};
        var corner = calcImageOffset(i);
        elem.left = corner.left;
        elem.top = corner.top;
        elem.index = i;
        elem.show = true;
        _store.cardArray.push(elem);
    }
}

function newMemGame(count) {
    init_cards();
    doubleCards(count);
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

function shuffle(target, items) {
    items.forEach(function(item) {
        var r = getRandomInt(0, target.length);
        target.splice(r, 0, item);
    });

}

function addCards(count) {

    for (var i=0; i<count; i++) {
        var c = getRandomInt(0, _store.cardArray.length);
        var card = _store.cardArray[c];

        _.pullAt(_store.cardArray, c);
        _store.dealtCards.push(card);
    }
}

function doubleCards(count) {
    for (var i=0; i<count; i++) {
        var c = getRandomInt(0, _store.cardArray.length);
        var card = _store.cardArray[c];

        _.pullAt(_store.cardArray, c);
        _store.dealtCards.push(card);
    }

    var duplicate = _.cloneDeep(_store.dealtCards);
    duplicate.forEach(function(elem) {
        elem.id += "dupe";
    });

    shuffle(_store.dealtCards, duplicate);

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

        return _store.dealtCards;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.ADD_CARDS:
            addCards(action.data);
            cardStore.emit(CHANGE_EVENT);
            break;
        case appConstants.MEMORY_CARDS:
            doubleCards(action.data);
            cardStore.emit(CHANGE_EVENT);
            break;

        case appConstants.NEW_MEMORY_GAME:
            newMemGame(action.data);
            cardStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = cardStore;