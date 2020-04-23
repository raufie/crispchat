import React from 'react';
import SignedInNav from './SignedInNav'
import SignedOutNav from './SignedOutNav'
const Navbar = (props) => {
    if (props.signedIn) {
        return <SignedInNav />
    } else {
        return (

            <SignedOutNav />



        )
    }


}
export default Navbar;