import React from 'react';
import {Router,Route,IndexRoute,IndexRedirect,hashHistory,Redirect} from "react-router"
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from "store"
import "./index.less"
const DefineProperty = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/es6/defineProperty').default);
	}, 'NewList');
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} >
            <Route path="defineProperty" getComponent={DefineProperty} />
        </Router>
    </Provider>,
	document.getElementById('root')
);