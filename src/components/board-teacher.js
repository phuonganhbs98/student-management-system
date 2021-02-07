import React, { Component } from "react";

import UserService from "../services/user-service";

export default class BoardTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    componentDidMount() {
        UserService.getTeacherBoard()
            .then(
                response => {
                    // console.log(response)
                    this.setState({
                        content: response.data
                    });
                },
                error => {
                    this.setState({
                        content: (error.response && error.response.data) ||
                            error.message ||
                            error.toString()
                    });
                }
            ).catch(err => console.error(err));
    }

    render() {
        let content = []
        if (this.state.content) {
            // console.log(this.state.content.users)
            this.state.content.users.forEach((element, index) => {
                content = content.concat(
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{element.fullname}</td>
                        <td>{element.email}</td>
                        <td>Xem</td>
                    </tr>
                )
            })
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Danh sách giáo viên</h3>
                </header>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }
}