import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';


const makeCard = (campus, deleteCampus) => (
	<div className="col-md-4" key={campus.id}>
		<div className="card">
		<div className="wrapper" style={{height: "100px", overflow:"hidden", width:"100%"}}>
		<img className="card-img img-responsive" src={campus.imageUrl} alt="Card image cap" />
		</div>
		<div className="swyxcardcontainer">
			<h4 className="card-title">{campus.name}</h4>
			<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<NavLink to={'/campuses/' + campus.id} className="btn btn-primary">Details</NavLink>
			<div className="btn btn-danger pull-right" onClick={()=>deleteCampus(campus.id)}>Delete</div>
		</div>
		</div>
	</div>
)

export default class extends React.Component {
	componentDidMount() {
		this.props.fetchCampuses()
	}
	render() {

		return (
			<div className="wrapper tutorial-page" style={{backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450')", backgroundSize: "100%"}}>
				<div className="header header-nofilter">
					<div className="container">
							<div className="row">
								<div className="col-md-12">
									<br />
									<br />
									<br />
									<br />
									<h1 className="title text-center" style={{color: "white"}}>Campuses</h1>
								</div>
							</div>
					</div>
				</div>

				<div className="main main-raised main-translucent-light">
					<div className="section">
						<div className="container">
							<div className="row tim-row">
								<NavLink to={'/campuses/new'}>
									<button className="btn btn-danger pull-right">
										Add New Campus
									</button>
								</NavLink>
							</div>
							<div className="row tim-row">
								{this.props.campuses.map(campus => makeCard(campus, this.props.deleteCampus))}
							</div>
						</div>
					</div>
				</div>
			</div>
    )
	}
} 