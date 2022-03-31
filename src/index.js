import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./seasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component{

    state = {lat: null, errorMsg: ""};
    componentDidMount () {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMsg: err.message})
        );
    };

    renderContent() {
        if(this.state.lat && !this.state.errorMsg){
            return <SeasonDisplay lat={this.state.lat}/>
        }
        if(this.state.errorMsg && !this.state.lat){
            return <div>Error: {this.state.errorMsg}</div>
        }
        return <div><Spinner message="Please accept location request to continue :)"/></div>
    };

    render () {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    };
};

ReactDOM.render(<App /> , document.querySelector("#root"))