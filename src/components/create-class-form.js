import Form from "react-validation/build/form"
import React, { Component } from 'react'
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import ClassService from "../services/class-service"

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}


export default class CreateClassForm extends Component {
    constructor(props) {
        super(props);
        this.handleCreateClass = this.handleCreateClass.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        
        this.state = {
            username: this.props.location.username,
            name: '',
            capacity: 0,
            successful: false,
            message: ''
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeCapacity(e) {
        this.setState({
            capacity: e.target.value
        })
    }

    handleCreateClass(e) {
        e.preventDefault();

        this.setState({
            message: '',
            successful: false
        })

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            ClassService.createClass(
                this.state.username,
                this.state.name,
                this.state.capacity
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    })
                }
            )
        }
    }

    render() {
        // console.log(this.props.location.username);

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <h3>Tạo class mới</h3>

                    <Form
                        onSubmit={this.handleCreateClass}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="capacity">Capacity</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="capacity"
                                        value={this.state.capacity}
                                        onChange={this.onChangeCapacity}
                                        validations={[required]}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Create</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}