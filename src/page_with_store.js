import Page from './page'
import store from './store/store';
import { Provider } from 'react-redux';
import React from 'react'

export default class PageWithStore extends React.Component  {

    render() {
        return(
            <Provider store={store}>{() => <Page/>}</Provider>
        )
    }
}