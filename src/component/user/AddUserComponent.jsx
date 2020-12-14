import React, { Component } from 'react'
import ApiService from "../../ApiService";

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class AddUserComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }

        ApiService.addUser(user)
        .then( res => {
            this.setState({
                message: user.lastName+'님이 등록되었습니다.'
            })
            console.log(this.state.message);
            this.props.history.push('/users');
        })
        .catch( err => {
            console.log('ERROR::: saveUser()', err)
        });
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>ADD USER</Typography>
                <form style={formContainer}>
                        <TextField type="text" placeholder="id를 입력해주세요." name="id" 
                        fullWidth margin="normal" value={this.state.id} onChange={this.onChange} />

                        <TextField type="password" placeholder="password를 입력해주세요." name="password" 
                        fullWidth margin="normal" value={this.state.password} onChange={this.onChange} />

                        <TextField type="text" placeholder="first name을 입력해주세요." name="firstName" 
                        fullWidth margin="normal" value={this.state.firstName} onChange={this.onChange} />

                        <TextField type="text" placeholder="last name을 입력해주세요." name="lastName" 
                        fullWidth margin="normal" value={this.state.lastName} onChange={this.onChange} />
                        
                        <TextField type="text" placeholder="e-mail을 입력해주세요." name="email" 
                        fullWidth margin="normal" value={this.state.email} onChange={this.onChange} />
                        
                    <Button variant="contained" color="primary" align="right" onclick={this.addUser}>등록</Button>

                </form>
            </div>
        );
    }
}

const formContainer = {
    display : 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default AddUserComponent;