import React, { Component } from 'react';
import './Forgotpassword.css';
import { resetPassword } from '../../util/APIUtils';
import Alert from 'react-s-alert';
//import { Link, Redirect } from 'react-router-dom'

class Forgotpassword extends Component {
    
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


    render(){
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