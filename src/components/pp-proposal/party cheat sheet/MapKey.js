import React, { Component } from 'react';

class MapKey extends Component {
    

    
    getColor(d, c1, grades) {
        //console.log(d, c1, grades);
        if (d > grades[2]) { return (c1[3]); }
        else if (d > grades[1]) { return (c1[2]); }
        /* else if (d > grades[0]) { return (c1[1]); } */
        else { return (c1[0]); }
      }

      
    render() {
         var grades = this.props.grades;
         //console.log();
         //console.log("mapkey grades",grades);
         //console.log(this.props.colorSet);
        return (
             <div className="info legend">
                 <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {grades.map(function(object, i){
                    console.log(i,object);
                    var bg=this.getColor(object + 1,this.props.colorSet,this.props.grades)
                    console.log('bbbbbbbbbb',bg);
                    return (
                            <div key={i}>
                                <i style={{background:bg}}  ></i>
                                {(grades[i + 1] ? (commaNum(grades[i])+this.props.percentageSign+'  -  '+commaNum(grades[i+1]))+this.props.percentageSign: ' + '+commaNum(grades[i])+this.props.percentageSign ) }
                                <br/>
                            </div>
                        )
                },this)} 
            </div>
        );
    }
}

export default MapKey;
const commaNum = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }