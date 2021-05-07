import React, { Component } from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: {}
        }


    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    formSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center"> Login </h1>
                            <p className="lead text-center">Login to your DevConnector account</p>
                            <form onSubmit={this.formSubmit}>

                                <div className="form-group">
                                    <input type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name="email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name="password"
                                        required
                                    />
                                </div>

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login