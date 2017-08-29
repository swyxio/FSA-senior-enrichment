import React, {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props)
		this.pagetitle = this.props.selectedStudent ? 'Edit Student' : 'Add New Student'
		this.submitbuttonText = this.props.selectedStudent ? 'Edit Student' : 'Add New Student'
		const student = this.props.selectedStudent || {name: '', bio: ''}
		student.campusId = student.campusId || ((this.props.campuses.length > 0 && this.props.campuses[0].id) || undefined)
		this.state = student
		this.handleField = this.handleField.bind(this)
	}
	handleField(e, field){
		const newstate = Object.assign({}, this.state)
		newstate[field] = e.target.value
		this.setState(newstate)
	}
	componentDidMount() {
		this.props.fetchData()
	}
	componentWillReceiveProps ({selectedStudent}) {
		this.setState(selectedStudent)
	}

	render() {
		const bgstyle = {
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
                                        <h1 className="title text-center" style={{color: "white"}}>{this.pagetitle}</h1>
									</div>
								</div>
						</div>
					</div>

					<div className="main main-raised main-translucent">
						<div className="section">
							<div className="container">
								<div className="row tim-row">
									<div className="col-md-8 col-md-offset-2">
										<form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
										<div className="form-group label-floating">
											<label className="control-label">Student Name</label>
                                            <input type="text" className="form-control" name="name" onChange={e => this.handleField(e, 'name')} value={this.state.name}/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Student Bio</label>
											<input type="text" className="form-control" name="bio" onChange={e => this.handleField(e, 'bio')} value={this.state.bio}/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Student Phone</label>
											<input type="text" className="form-control" name="phone" onChange={e => this.handleField(e, 'phone')} value={this.state.phone}/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Student Photo</label>
											<input type="text" className="form-control" name="photo" onChange={e => this.handleField(e, 'photo')} value={this.state.photo}/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Student Email</label>
											<input type="text" className="form-control" name="email" onChange={e => this.handleField(e, 'email')} value={this.state.email}/>
										</div>
                                        <div className="form-group">
                                            <label htmlFor="sel1">Assigned Campus:</label>
											<select className="form-control" id="sel1" onChange={e => this.handleField(e, 'campusId')} style={{color:'white'}} value={this.state.campusId}>
                                                {this.props.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
                                            </select>
                                        </div>
										<button type="submit" className="btn btn-primary pull-right">{this.submitbuttonText}</button>
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
	