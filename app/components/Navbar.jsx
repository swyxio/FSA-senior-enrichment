import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default () => (
      <nav className="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll">
    	<div className="container">
        	<div className="navbar-header">
        		<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example">
            		<span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
        		</button>
				<NavLink className="navbar-brand" to={'/home'}>MHIA.js Home</NavLink>
        	</div>

        	<div className="collapse navbar-collapse" id="navigation-example">
        		<ul className="nav navbar-nav navbar-right">
    				<li>
						<NavLink to={'/students'}>Students</NavLink>
    				</li>
    				<li>
						<NavLink to={'/campuses'}>Campuses</NavLink>
    				</li>
        		</ul>
        	</div>
    	</div>
    </nav>
    )