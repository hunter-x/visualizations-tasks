import React, { Component } from 'react';

class MapKey extends Component {

    render() {
        var grades = [0, ...this.props.grades]
        return (
            <div className="infoLegendStat legend">
                <p className='mapKeyTitle'><b>{this.props.keyTitle}</b></p>
                <p className='mapKeyTitle'>{this.props.keySubtitle}</p>
                {grades.map(function (object, i) {
                    var bg = this.props.getColor(object + 1, this.props.colorSet, this.props.grades)
                    return (
                        <div key={i + this.props.colorSet}>
                            <i style={{ background: bg }}  ></i>
                            {(grades[i + 1] ? (grades[i] + '  -  ' + grades[i + 1]) : ' + ' + grades[i])}
                            <br />
                        </div>
                    )
                }, this)}
            </div>
        );
    }
}

export default MapKey;