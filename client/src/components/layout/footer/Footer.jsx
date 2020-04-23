import React from 'react';
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="page-footer  indigo darken-4" >
            <div className="container" >
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Technocrats Inc &copy;</h5>
                        <p className="grey-text text-lighten-4">Please chat safely and don't be rude, reported users will certainly be kicked</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><a target="_blank" href="http://github.com/rauf-source" className="grey-text text-lighten-3" >Github</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2020 Made By Abdul Rauf

                </div>
            </div>
        </footer>


    )


}

export default Footer;