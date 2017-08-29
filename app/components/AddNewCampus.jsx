import React, {Component} from 'react';

export default class extends Component {

	constructor() {
		super()
		this.state = {
			name: '',
			imageUrl: ''
		}
		this.handleName = this.handleName.bind(this)
		this.handleUrl = this.handleUrl.bind(this)
	}
	handleName(e){
		this.setState({name: e.target.value})
	}
	handleUrl(e){
		this.setState({imageUrl: e.target.value})
	}

	render() {
		const bgstyle = {
			// height: "100vh",
			backgroundImage: (this.props.backgroundImage || "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450')"),
			backgroundSize: "100%"
		}
		return (
			<div className="wrapper tutorial-page" style={bgstyle}>
					<div className="header header-nofilter">
						<div className="container">
								<div className="row">
									<div className="col-md-12">
										<br />
										<br />
										<br />
										<br />
										<h1 className="title text-center" style={{color: "white"}}>Add New Campus</h1>
									</div>
								</div>
						</div>
					</div>

					<div className="main main-raised main-translucent">
						<div className="section">
							<div className="container">
								<div className="row tim-row">
									<div className="col-md-8 col-md-offset-2">
										<form onSubmit={(e) => this.props.handleSubmit(e, this.state.name, this.state.imageUrl)}>
										<div className="form-group label-floating is-empty">
											<label className="control-label">Campus Name</label>
											<input type="text" className="form-control" name="name" onChange={this.handleName}/>
										</div>
										<div className="form-group label-floating is-empty">
											<label className="control-label">Campus Image URL</label>
											<input type="text" className="form-control" name="imageUrl" onChange={this.handleUrl}/>
										</div>
										<button type="submit" className="btn btn-primary pull-right">
											Add New Campus
										</button>
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
	