import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home'

export class Navbar extends Component {
    render() {
        return (
            <AppBar>

                <Toolbar className='nav-container'>
                <div>
                    <Button color='inherit' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to='/signup'>
                        Signup
                    </Button>

                </div>
                </Toolbar>

            </AppBar>
        )
    }
}

export default Navbar
