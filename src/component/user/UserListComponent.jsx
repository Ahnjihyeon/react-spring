import React, { Component } from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

class UserListComponent extends Component {

    constructor(props){
        super(props);

        this.state={
            users: [],
            message: null
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers()
            .then( res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('ERROR::: reloadUserList()', err)
            })
    }

    deleteUser = (userID) => {
        ApiService.deleteUser(userID)
            .then( res => {
                this.setState({
                    message: '삭제 완료되었습니다.'
                });
                this.setState({
                    users: this.state.users.filter( user =>
                        user.id !== userID)
                });
            })
            .catch(err => {
                console.log('ERROR::: deleteUser()', err);
            })
    }

    editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
        this.props.history.push('/edit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>USER LIST</Typography>
                <Button variant="contained" color="primary" align="right" onclick={this.addUser}>등록</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">FIRST NAME</TableCell>
                            <TableCell align="right">LAST NAME</TableCell>
                            <TableCell align="right">E-MAIL</TableCell>
                            <TableCell align="right">수정</TableCell>
                            <TableCell align="right">삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map( user =>
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="id" align="right">{user.id}</TableCell>
                                <TableCell align="right">{user.firstName}</TableCell>
                                <TableCell align="right">{user.lastName}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right" onClick={() => this.editUser(user.id)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.deleteUser(user.id)}><DeleteIcon /></TableCell>
                            </TableRow>    
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const style = {
    display : 'flex',
    justifyContent: 'center'
}

const btnStyle = {
    Right:0
}

export default UserListComponent;