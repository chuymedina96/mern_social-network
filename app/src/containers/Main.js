import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom"
import {connect} from "react-redux"

import AuthForm from "../components/AuthForm"
import Homepage from "../components/Homepage"

const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route exact path = "/" render={props => <Homepage {...props} /> }>

                </Route>
                <Route exact path = "/signin" render={props => {
                    return(
                        <AuthForm buttonText="Login" heading="Welcome Back." {...props} />
                    ) 
                }}>
                </Route>
                <Route exact path = "/signup" render={props => {
                    return(
                        <AuthForm buttonText="Sign me up!" heading="Join today!" {...props} />
                    ) 
                }}>
                </Route>
            </Switch>
        </div>
    )
}
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(Main))

