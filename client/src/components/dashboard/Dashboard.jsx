import React, { Component } from 'react';
import Search from './search/Search';
import Recents from './recents/Recents';
class Dashboard extends Component {
    render() {
        return (
            <div className="container row">
                <h3 className="brand-logo center white-text" style={{ paddingTop: "2vh", paddingBottom: "2vh", textShadow: "0 0 1vw #e0f7fa, 0 0 5px #0000FF" }}>
                    Dashboard
                    </h3>
                <div className="col s6" style={{ borderStyle: "solid" }}>
                    <Recents />
                </div>
                <div className="col s6" style={{ borderStyle: "solid" }}>
                    <Search />
                </div>
            </div>
        )
    }
}
export default Dashboard;