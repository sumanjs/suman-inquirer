'use strict';
var rx = require('rx');

function normalizeKeypressEvents (value, key) {
  return { value: value, key: key || {} };
}

module.exports = function (rl, self) {

  var keypress = rx.Observable.fromEvent(rl.input, 'keypress', normalizeKeypressEvents)
    .filter(function (e) {
      // Ignore `enter` key. On the readline, we only care about the `line` event.
      return e.key.name !== 'enter' && e.key.name !== 'return';
    });

  return {

    line: rx.Observable.fromEvent(rl, 'line'),

    keypress: keypress,

    normalizedBackspaceKey: keypress.filter(function (e) {
      if (e.key.name === 'backspace' || e.key.name === 'delete') {

        self.backspaceHit = true;
        rl.emit('line');
        process.nextTick(function(){
          self.onBackspace();
        });

        return true;
      }
    }).share(),

    normalizedLeftKey: keypress.filter(function (e) {
      return e.key.name === 'left';
    }).share(),

    normalizedRightKey: keypress.filter(function (e) {
      return e.key.name === 'right';
    }).share(),

    normalizedUpKey: keypress.filter(function (e) {
      return e.key.name === 'up' || e.key.name === 'k' || (e.key.name === 'p' && e.key.ctrl);
    }).share(),

    normalizedDownKey: keypress.filter(function (e) {
      return e.key.name === 'down' || e.key.name === 'j' || (e.key.name === 'n' && e.key.ctrl);
    }).share(),

    numberKey: keypress.filter(function (e) {
      return e.value && '123456789'.indexOf(e.value) >= 0;
    }).map(function (e) {
      return Number(e.value);
    }).share(),

    spaceKey: keypress.filter(function (e) {
      return e.key && e.key.name === 'space';
    }).share(),

    aKey: keypress.filter(function (e) {
      return e.key && e.key.name === 'a';
    }).share(),

    iKey: keypress.filter(function (e) {
      return e.key && e.key.name === 'i';
    }).share()
  };
};
