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
const ProxyObj = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/es6/proxyObj').default);
	}, 'NewList');
};
const Promise = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/es6/promise').default);
	}, 'Promise');
};
const HocFunc = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/es6/hocFunc').default);
	}, 'HocFunc');
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} >
            <Route path="hocFunc" getComponent={HocFunc} />
            <Route path="promise" getComponent={Promise} />
            <Route path="defineProperty" getComponent={DefineProperty} />
            <Route path="proxyObj" getComponent={ProxyObj} />
        </Router>
    </Provider>,
	document.getElementById('root')
);