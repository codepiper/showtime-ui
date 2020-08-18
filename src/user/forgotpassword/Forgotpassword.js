import React, { Component } from 'react';
import './Forgotpassword.css';
import { resetPassword } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
//import { Link, Redirect } from 'react-router-dom'

class Forgotpassword extends Component {


    render(){
        return (

                <div className="login-container">
                    <div className="login-content">
                        <h1 className="login-title">Login to SpringSocial</h1>
                        <SocialLogin />
                        <div className="or-separator">
                            <span className="or-text">OR</span>
                        </div>
                        <ForgotpasswordForm {...this.props} />
                        <span className="signup-link">New user? [<Link to="/signup">Sign up!</Link>] [<Link to="/login">Login !</Link>]</span>
                    </div>
                </div>

        );

    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                {/* <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a> */ }
            </div>
        );
    }
}

class ForgotpasswordForm extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }


    handleSubmit(event) {
        event.preventDefault();   
        const resetPasswordRequest = Object.assign({}, this.state);

        resetPassword(resetPasswordRequest)
        .then(response => {
            Alert.success("Your temporary password has been sent to your email id !");
            this.props.history.push("/");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }


    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email}   onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Get Password to Email ID</button>
                </div>
                </form> 
        );
    }
}

export default Forgotpassword