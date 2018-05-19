import './../imports/ui/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './../imports/ui/App'
import {Meteor} from 'meteor/meteor'

Meteor.startup(() => {
    ReactDOM.render(<App/>, document.getElementById('root'));
    // ReactDOM.render(<App />, document.getElementById('root'));
});

