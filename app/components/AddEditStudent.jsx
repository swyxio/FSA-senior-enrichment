import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props)
        console.log('this.props.campuses ', this.props.campuses)
		this.state = {
			name: '',
			bio: '',
            campusId: (this.props.campuses.length > 0 && this.props.campuses[0].id) || null,
		}
		this.handleName = this.handleName.bind(this)
		this.handleBio = this.handleBio.bind(this)
		this.handleCampusId = this.handleCampusId.bind(this)
	}
	handleName(e){
		this.setState({name: e.target.value})
	}
	handleBio(e){
		this.setState({bio: e.target.value})
	}
	handleCampusId(e){
		this.setState({campusId: +e.target.value})
	}
	componentDidMount() {
		this.props.fetchCampuses()
	}

	render() {
        const pagetitle = 'Add New Student'
        const submitbuttonText = 'Add New Student'

		const bgstyle = {
			// height: "100vh",
			backgroundImage: (this.props.backgroundImage || "url('https://s-media-cache-ak0.pinimg.com/originals/90/f7/44/90f744e74143a15fa17cc2abbe1258e4.jpg')"),
			backgroundSize: "100%"
		}

		return (
			<div className="wrapper tutorial-page"  style={bgstyle}>
					<div className="header header-nofilter">
						<div className="container">
								<div className="row">
									<div className="col-md-12">
										<br />
										<br />
										<br />
										<br />
                                        <h1 className="title text-center" style={{color: "white"}}>{pagetitle}</h1>
									</div>
								</div>
						</div>
					</div>

					<div className="main main-raised main-translucent">
						<div className="section">
							<div className="container">
								<div className="row tim-row">
									<div className="col-md-8 col-md-offset-2">
										<form onSubmit={(e) => this.props.handleSubmit(e, this.state.name, this.state.bio, this.state.campusId)}>
										<div className="form-group label-floating is-empty">
											<label className="control-label">Student Name</label>
                                            <input type="text" className="form-control" name="name" onChange={this.handleName} value={this.state.name}/>
										</div>
										<div className="form-group label-floating is-empty">
											<label className="control-label">Student Bio</label>
											<input type="text" className="form-control" name="imageUrl" onChange={this.handleBio} value={this.state.bio}/>
										</div>
                                        <div className="form-group">
                                            <label htmlFor="sel1">Assigned Campus:</label>
                                            <select className="form-control" id="sel1" onChange={this.handleCampusId} style={{color:'white'}}>
                                                {this.props.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
                                            </select>
                                        </div>
										<button type="submit" className="btn btn-primary pull-right">{submitbuttonText}</button>
										</form>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}
	