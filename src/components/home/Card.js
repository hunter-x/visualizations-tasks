import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import './card.css'

export default class Card extends Component {

    render() {
        const imageLink = "/img/card/" + this.props.img
        const { redirectLink, title, description } = this.props
        const READMORE = <Translate type="text" content="home.readmore" />//readmore
        return (
            <div className="col-xs-12 col-sm-4">

                <div className="card">
                    <Link to={redirectLink} className="img-card" > <img src={imageLink} /></Link>

                    <div className="card-content">
                        <h4 className="card-title">
                            <Link to={redirectLink} >{title}</Link>
                        </h4>
                        <p className="">
                            {description}
                        </p>
                    </div>

                    <div className="card-read-more">
                        <Link to={redirectLink} className="btn btn-link btn-block" >{READMORE}</Link>
                    </div>
                </div>
            </div>
        );
    }
}

