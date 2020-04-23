import React from 'react';


class Intro extends React.Component {
    state = {
        bool: true,
        fun: setTimeout(() => {
            this.setState({
                bool: true
            })

        }, 1)
    }

    render() {
        setTimeout(() => {
            this.setState({
                bool: false
            })

        }, 3000);
        if (this.state.bool) {
            return (<div className="animated slideOutRight" style={{ animationDelay: "2s", backgroundColor: '#01579b', zIndex: "2", width: "100vw", height: "100vh", position: "fixed" }}>
                <div className="row center intro-text" style={{ margin: "40vh 43.1vw " }}>
                    <h3 className="animated bounceInLeft col white-text"><span className="animated heartBeat" style={{ animationDelay: "1s" }}>CrispChat</span><span className=" animated rollOut material-icons white-text " style={{ animationDelay: "1.5s" }}>whatshot</span></h3>

                </div>
            </div >)
        } else {
            return <div style={{ position: "absolute" }}></div>;
        }

    }



}
export default Intro;