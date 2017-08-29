import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default () => (
        <div className="wrapper landing-page">
		<div className="header header-filter" style={{backgroundImage: "url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450')"}}>
            <div className="container">
                <div className="row">
					<div className="col-md-6">
						<h1 className="title">The Margaret Hamilton Interplanetary Academy of JavaScript</h1>
	                    <h4>The premier Javascript education institution in the cosmos now has the best student management platform ever. 
						Yes, in 3017 we are still using Sequelize, Express, React, and Redux because the best institutions have 1000 year backwards compatibility.</h4>
	                    <br />
						<NavLink to={'/students'}>
							<div className="btn btn-primary btn-raised btn-lg">
								<i className="fa fa-play"></i> Manage Students
							</div>
						</NavLink>
						<NavLink to={'/campuses'}>
							<div className="btn btn-info btn-raised btn-lg">
								<i className="fa fa-play"></i> Manage Campuses
							</div>
						</NavLink>
					</div>
                </div>
            </div>
        </div>
		</div>
    )
