import Page from './page_with_store'
import React from 'react'
import $ from 'jquery'
import './store/data_feeds'

require('./stylesheets/app.scss');

React.render(<Page/>, $('#content')[0]);