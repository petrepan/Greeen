import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { Links } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile, auth, match }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])

    return (
        <Fragment>

        </Fragment>
    )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});
    
export default connect(mapStateToProps, {getProfileById})(Profile);