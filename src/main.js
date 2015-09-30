import Page from './page'
import React from 'react'
import $ from 'jquery'
import store from './store/store'
import { Provider } from 'react-redux';

require('./stylesheets/app.scss');

React.render(<Provider store={store}>{() => <Page/>}</Provider>, $('#content')[0]);