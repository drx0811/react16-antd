import React from 'react';
import {Router,Route,IndexRoute,IndexRedirect,hashHistory,Redirect} from "react-router"
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from "store"
import "./index.less"
const button_disabled = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/button_disabled').default);
	}, 'button_disabled');
};
const WrappedRegistrationForm = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/wrappedRegistrationForm').default);
	}, 'WrappedRegistrationForm');
};
const WrappedAdvancedSearchForm = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/WrappedAdvancedSearchForm').default);
	}, 'WrappedAdvancedSearchForm');
};
const WrappedDynamicFieldSet = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/WrappedDynamicFieldSet').default);
	}, 'WrappedDynamicFieldSet');
};
const WrappedDemo = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/WrappedDemo').default);
	}, 'WrappedDemo');
};
const CustomizedForm = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/form/CustomizedForm').default);
	}, 'CustomizedForm');
};
const Funs = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/react16/funst').default);
	}, 'Funs');
};
const NewList = (location, cb) => {     // 按需加载富登入页面
	require.ensure([], require => {
		cb(null, require('pages/react16/newList').default);
	}, 'NewList');
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} >
            <Route path="newlist" getComponent={NewList} />
            <Route path="funstions" getComponent={Funs} />
            <Route path="button_disabled" getComponent={button_disabled} />
            <Route path="wrappedRegistrationForm" getComponent={WrappedRegistrationForm} />
            <Route path="WrappedAdvancedSearchForm" getComponent={WrappedAdvancedSearchForm} />
            <Route path="WrappedDynamicFieldSet" getComponent={WrappedDynamicFieldSet} />
            <Route path="WrappedDemo" getComponent={WrappedDemo} />
            <Route path="CustomizedForm" getComponent={CustomizedForm} />
        </Router>
    </Provider>,
	document.getElementById('root')
);