import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default class extends React.Component {
    componentDidMount() {
        this.props.fetchStudent()
    }
    render() {
        const props = this.props.selectedStudent
            return (
            <div className="wrapper profile-page" style={{backgroundImage: "url('/assets/img/examples/city.jpg')", backgroundSize: "100%"}}>
                <div className="header header-filter">
                </div>

                <div className="main main-raised main-translucent">
                    <div className="profile-content">
                        <div className="container">
                            <div className="row">
                                <div className="profile">
                                    <div className="avatar">
                                        <img src={props.photo} alt="Circle Image" className="img-circle img-responsive img-raised" />
                                    </div>
                                    <div className="name">
                                        <h3 className="swyx-undo-title">{props.name}</h3>
                                        {props.campus && <NavLink to={'/campuses/' + props.campus.id}>
                                            <button className="btn btn-primary">{props.campus.name}</button>
                                        </NavLink>}
                                    </div>
                                </div>
                            </div>
                            <div className="swyx-undo-description text-center">
                                <p>{props.bio}</p>
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-md-offset-3">
                                    <p>Phone: {props.phone}</p>
                                    <p>Email: {props.email}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            )
        }
}