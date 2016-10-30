import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
	render() {
		return (<div>home page,<Link to="{/user}">to user</Link></div>);
	}
}