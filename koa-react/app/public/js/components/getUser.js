import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

export default class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: '' };
    }

    componentDidMount() {
        let self = this;

        // 使用 jQuery ajax 方法获取 API 数据
        this.r = $.get(this.props.source, (user) => {
            self.setState({
                data: user,
            });
        });
    }

    componentWillUnmount() {
        this.r.abort();
    }

    render() {
        return (<div>{this.state.data.user}</div>);
    }
}