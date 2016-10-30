import React from 'react';
import {render} from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './pages/home';
import User from './pages/user';


const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        	<IndexRoute component={Home} />
        	<Route path="user" component={User}>
        	</Route>
        </Route>
    </Router>
);

// 创建app根组件
class App extends React.Component {
	render() {
		return (
			<div className="container">
			    {this.props.children}
			</div>
			);
	}
}




render(routes,document.getElementById('app-root'));
