import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Swal from 'sweetalert2'
import Experience from './Experience'
import Education from './Education'
import isEmpty from '../../validation/is-empty'


class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    deleteAccount = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No, cancel!',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    this.props.deleteAccount();
                }
                else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        title: 'Cancelled!',
                        text: 'Your profile is safe.',
                        icon: 'error',
                        timer: 3000,
                        showConfirmButton: false
                    })
                }
            }
            )


    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent =
                <p className="text-center" style={{ marginTop: "50px", paddingBottom: "50px" }}>
                    <PuffLoader size="60" color="#36D7B7" />
                </p>
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="card card-body bg-info text-white mb3">
                                    <div className="row">
                                        <div className="col-4 col-md-3 m-auto">
                                            <img src={profile.user.avatar} alt="" className="rounded-circle" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h1 className="display-4 text-center">{profile.user.name}</h1>
                                        <p className="lead text-center">
                                            {profile.status}
                                            {isEmpty(profile.company) ? null
                                                : <span>at {profile.company}</span>}
                                        </p>
                                        {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

                                        <p>
                                            {isEmpty(profile.website) ? null : (
                                                <a href={profile.website} className="text-white p-2" target="_blank">
                                                    <i className="fa fa-globe fa-2x"></i>
                                                </a>
                                            )}

                                            {isEmpty(profile.social && profile.social.facebook) ? null : (
                                                <a href={profile.social.facebook} className="text-white p-2" target="_blank">
                                                    <i className="fab fa-facebook fa-2x"></i>
                                                </a>
                                            )}

                                            {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                                <a href={profile.social.linkedin} className="text-white p-2" target="_blank">
                                                    <i className="fab fa-linkedin fa-2x"></i>
                                                </a>
                                            )}

                                            {isEmpty(profile.social && profile.social.twitter) ? null : (
                                                <a href={profile.social.twitter} className="text-white p-2" target="_blank">
                                                    <i className="fab fa-twitter fa-2x"></i>
                                                </a>
                                            )}

                                            {isEmpty(profile.social && profile.social.youtube) ? null : (
                                                <a href={profile.social.youtube} className="text-white p-2" target="_blank">
                                                    <i className="fab fa-youtube fa-2x"></i>
                                                </a>
                                            )}

                                            {isEmpty(profile.social && profile.social.instagram) ? null : (
                                                <a href={profile.social.instagram} className="text-white p-2" target="_blank">
                                                    <i className="fab fa-instagram fa-2x"></i>
                                                </a>
                                            )}
                                        </p>

                                    </div>
                                </div>
                            </div >
                        </div >
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div style={{ marginBottom: "60px" }} />
                        <button onClick={this.deleteAccount} className="btn btn-danger"><i className="fa fa-trash"></i> Delete Account</button>

                    </div>
                )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)