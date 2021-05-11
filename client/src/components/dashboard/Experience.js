import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import 'moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {

    deleteExp(id) {
        this.props.deleteExperience(id)
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td><Moment format="MMMM DD, YYYY">{exp.from}</Moment> - {exp.to === null ? "Present" : <Moment format="MMMM DD, YYYY">{exp.to}</Moment>}</td>
                <td><button onClick={this.deleteExp.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4 mt-4">Experience</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
