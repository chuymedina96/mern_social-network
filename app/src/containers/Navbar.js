import React, {Component} from 'react';
import './Navbar.css'
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import logo from "../images/warbler-logo.png";

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Netowkr Home" />
                        </Link>
                    </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link to="/signin">
                            Sign In
                        </Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}
function mapStateToProps(state){
    return {
        currenUser: state.currenUser
    }
}

export default connect(mapStateToProps, null)(Navbar)