import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileCreds from './ProfileCreds'
import ProfileAbout from './ProfileAbout'
import ProfileGithub from './ProfileGithub'
import PuffLoader from "react-spinners/PuffLoader";
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }

    }

    render() {
        const { profile, loading } = this.props.profile

        let profileContent;

        if (profile === null || loading) {
            profileContent =
                <p className="text-center" style={{ marginTop: "50px", paddingBottom: "50px" }}>
                    <PuffLoader size="60" color="#36D7B7" />
                </p>
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back to Profiles</Link>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>

                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    {profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : null}
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
