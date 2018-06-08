import React, { Component } from 'react';

class MapKey extends Component {

    render() {
        var grades = this.props.grades;
        //console.log();
        //console.log("mapkey grades",grades);
        //console.log(this.props.colorSet);
        return (
            <div className="info legend">
                <p style={{ marginLeft: "10px" }}>{this.props.keyTitle}</p>
                <div >
                    <i style={{ background: "#6BD6C5" }}  ></i>
                    Project Exists
                    <br />
                </div>
                <div >
                <i style={{ background: "#FFD8BB" }}  ></i>
                Project does not Exists
                <br />
            </div>
                
            </div>
        );
    }
}

export default MapKey;
