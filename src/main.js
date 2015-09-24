import Page from './page'
import React from 'react'
import $ from 'jquery'
import 'whatwg-fetch'
require('./stylesheets/app.scss');


React.render(<Page/>, $('#content')[0]);