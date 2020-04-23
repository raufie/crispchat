import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import ChangePassword from './components/auth/forgotpassword/ChangePassword';
import { connect } from 'react-redux';
import Cookie from 'js-cookie'
import './App.css'
//functions
import { checkAuthStatus } from './actions/authActions/authActions';
//files
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Intro from './components/layout/intro/Intro';
import Landing from './components/landing/Landing';
import SignUp from './components/auth/signup/SignUp'
import ForgotPassword from './components/auth/forgotpassword/ForgotPassword'
import NotFound from './components/layout/NotFound'
//signed in
import Dashboard from './components/dashboard/Dashboard';
import Chat from './components/chat/Chat'
import Settings from './components/settings/Settings'

// setTimeout(() => {
//     signedIn = false;
//     console.log(signedIn)
// }, 3000)
//lets setup redux for our mern chat app

class App extends Component {
    componentDidMount() {
        this.props.checkSignedIn();
    }
    render() {
        let signedIn = false;
        if (this.props.isSignedIn) {
            signedIn = true;
        }

        const SignedInRoute = ({ component: Component, ...rest }) => {
            return (<Route {...rest} render={(props) => {
                return signedIn ? <Component {...props} />
                    : <Redirect to="/" />
            }} />)
        }
        const SignedOutRoute = ({ component: Component, ...rest }) => {
            return (<Route {...rest} render={(props) => {
                return signedIn === false ? <Component {...props} />
                    : <Redirect to="/" />
            }} />)
        }



        return (
            <BrowserRouter>
                {/* <Route exact path="/" component={Intro} /> */}
                <Navbar signedIn={signedIn} />
                <Switch>
                    <SignedInRoute exact path={signedIn ? "/" : "/protected"} component={Dashboard} />
                    <SignedInRoute path="/chat/:id" component={Chat} />
                    <SignedInRoute path="/settings" component={Settings} />
                    <SignedOutRoute exact path="/" component={Landing} />
                    <SignedOutRoute path="/signup" component={SignUp} />
                    <SignedOutRoute path="/forgotpassword" component={ForgotPassword} />
                    <SignedOutRoute path="/changepassword/:id" component={ChangePassword} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.authReducer.signedIn,
        signInSuccess: state.authReducer.signInSuccess
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        checkSignedIn: () => {
            dispatch(checkAuthStatus())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
