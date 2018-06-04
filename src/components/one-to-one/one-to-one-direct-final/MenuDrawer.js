import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import InputRange from 'react-input-range';
import Checkbox from 'material-ui/Checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBorderSelection, getTreatmentSelection } from "../../../actions/index";

class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            munBorder: false, govBorder: true,
            gratitude: true, intention: true, pressure: true, other: true,
            errOpacity: false,
            opacity:0.3

        };
    }

    handleToggle() { this.setState({ open: !this.state.open }) }

    /*This func to handle what to show as border  */
    handleBorderSelection(e, isInputChecked) {
        console.log(e.target.value);
        if (e.target.value == 'munBorder') {
            this.setState({ munBorder: isInputChecked });
            this.props.getBorderSelection({ munBorder: isInputChecked, govBorder: this.state.govBorder });
        } else {
            this.setState({ govBorder: isInputChecked });
            this.props.getBorderSelection({ govBorder: isInputChecked, munBorder: this.state.munBorder });
        }
    }
    /* Handle which treatment to project */
    handleTreatment(e, isInputChecked) {
        if (e.target.value == 'gratitude') {
            this.setState({ gratitude: isInputChecked });
            this.props.getTreatmentSelection({ gratitude: isInputChecked, intention: this.state.intention, pressure: this.state.pressure, other: this.state.other,opacity:this.state.opacity });
        } else if (e.target.value == 'intention') {
            this.setState({ intention: isInputChecked });
            this.props.getTreatmentSelection({ intention: isInputChecked, gratitude: this.state.gratitude, pressure: this.state.pressure, other: this.state.other,opacity:this.state.opacity });
        } else if (e.target.value == 'other') {
            this.setState({ other: isInputChecked });
            this.props.getTreatmentSelection({ other: isInputChecked, gratitude: this.state.gratitude, pressure: this.state.pressure, intention: this.state.intention,opacity:this.state.opacity });
        } else {
            this.setState({ pressure: isInputChecked });
            this.props.getTreatmentSelection({ pressure: isInputChecked, gratitude: this.state.gratitude, intention: this.state.intention, other: this.state.other,opacity:this.state.opacity });
        }
    }
    handleChangeOpacity(e, val) {
        if ((!isNaN(val))) {
            this.setState({ opacity: val });
            this.props.getTreatmentSelection({ pressure: this.state.pressure, gratitude: this.state.gratitude, intention: this.state.intention, other: this.state.other,opacity:val });
        }else{
            errOpacity:true
        }
    }
    render() {

        return (
            <div>
                <RaisedButton
                    style={{ position: "absolute", left: "2vh", top: "50vh", zIndex: 500 }}
                    label='Open Option Drawer'
                    secondary={true}
                    onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"25%"}
                    open={this.state.open}
                    openSecondary={false}
                    containerStyle={{ top: "0vh", height: "100%", zIndex: "1001", position: "absolute" }}
                    onRequestChange={(open) => this.setState({ open })}
                    zDepth={2}
                >
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div style={{ marginTop: '5vh', marginBottom: '2vh', marginLeft: '2vh' }}>

                        <h5 className='bulletPoint fiveMarginTop' >Choose to show or hide borders</h5>
                        <Checkbox
                            value="munBorder"
                            label='Municipality border'
                            defaultChecked={false}
                            onCheck={this.handleBorderSelection.bind(this)}
                        />
                        <Checkbox
                            value="govBorder"
                            label='governrate border'
                            onCheck={this.handleBorderSelection.bind(this)}
                            defaultChecked={true}
                        />

                    </div>

                    <div style={{ marginTop: '5vh', marginBottom: '2vh', marginLeft: '2vh' }}>
                        <h5 className='bulletPoint fiveMarginTop' >Choose treatments </h5>
                        <Checkbox
                            value="gratitude"
                            label='Gratitude'
                            defaultChecked={true}
                            onCheck={this.handleTreatment.bind(this)}
                            labelStyle={{ color: 'green' }}
                        />
                        <Checkbox
                            value="intention"
                            label='Intentions'
                            defaultChecked={true}
                            onCheck={this.handleTreatment.bind(this)}
                            labelStyle={{ color: 'orange' }}
                        />
                        <Checkbox
                            value="pressure"
                            label='Social Pressure'
                            defaultChecked={true}
                            onCheck={this.handleTreatment.bind(this)}
                            labelStyle={{ color: 'red' }}
                        />
                        {/* <Checkbox
                            value="other"
                            label='other'
                            defaultChecked={true}
                            onCheck={this.handleTreatment.bind(this)}
                            labelStyle={{ color: 'blue' }}
                        /> */}

                    </div>
                    <div style={{ marginTop: '5vh', marginBottom: '2vh', marginLeft: '2vh' }}>
                        <h5 className='bulletPoint fiveMarginTop'>select the color fill opacity from 0.1 to 1</h5>
                        {this.state.errOpacity ?
                            <TextField
                                hintText="default value is 0.3"
                                defaultValue={0.3}
                                onChange={this.handleChangeOpacity.bind(this)}
                                errorText='you have to enter a number from 0.1 to 1 '
                            />
                            : <TextField
                                hintText="default value is 0.3"
                                defaultValue={0.3}
                                onChange={this.handleChangeOpacity.bind(this)}
                            />
                        }
                    </div>
                    <div style={{ marginTop: '5vh', marginBottom: '2vh', marginLeft: '2vh' }}>
                    <h6 className='fiveMarginTop' >You can click on the circles to get the PC's info</h6>
                    <h6 className='' >If you want to zoom in or out use the '+' , '-' of the keyboard or your mouse wheel  </h6>
                    <h6 className='' >You can change the map layer (satelite, openStreet Map ) by choosing from the top right option button   </h6>
                    </div>
                    


                </Drawer>
            </div>
        );
    }
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
    // Whenever getPopValue is called, the result shoudl be passed
    // to all of our reducers
    return bindActionCreators({ getBorderSelection, getTreatmentSelection }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(MenuDrawer);