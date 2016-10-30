import React from 'react';
import GetUser from '../components/getUser';

export default class User extends React.Component {
	render() {
		return (<GetUser source='/api/user'/>);
	}
}