import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';


export default class User extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <link rel="stylesheet" href="/less/user.css" />
                <div className="container">
                    <table className="table table-bordered table-hover">
                        <caption>{this.props.title}</caption>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>部门</th>
                                <th>姓名</th>
                                <th>参与抽奖</th>
                                <th>手机号</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.department}</td>
                                        <td>
                                            <a
                                                href={user.image}
                                                target="_blank"
                                                data-toggle="tooltip"
                                            >
                                                    <img src={user.image} className="img-thumbnail" />
                                            </a>
                                            {user.name}
                                        </td>
                                        <td>{user.enable ? '是' : '否'}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <script src="/lib/jquery.js"></script>
                <script src="/lib/bootstrap.js"></script>
                <script src="/js/user.js"></script>
            </Layout>
        );

    }

}

User.propTypes = {
    title: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        enable: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
};
