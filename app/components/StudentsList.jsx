import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

const makeRow = (student, deleteStudent) => {
	// console.log('student', student)
	return(
		<tr key={student.id}>
			<td className="text-center">{student.id}</td>
			<td>{student.name}</td>
			<td>{student.campus ? student.campus.name : 'N/A'}</td>
            <td>2013</td>
            <td className="td-actions text-right">
				<NavLink to={'/students/' + student.id}>
					<button type="button" rel="tooltip" title="View Profile" className="btn btn-info btn-simple btn-xs">
						<i className="fa fa-user"></i>
					</button>
				</NavLink>
                <button type="button" rel="tooltip" title="Edit Profile" className="btn btn-success btn-simple btn-xs">
                    <i className="fa fa-edit"></i>
                </button>
				<button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs" onClick={()=>deleteStudent(student.id)}>
                    <i className="fa fa-times"></i>
                </button>
            </td>
        </tr>
)
}

export default class extends React.Component {
	componentDidMount() {
		this.props.fetchStudents()
	}
	render() {
		// get varaibles from props
		const bgstyle = {
			// height: "100vh",
			backgroundImage: (this.props.backgroundImage || "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&dpr=2&fit=crop&fm=jpg&h=750&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1450')"),
			backgroundSize: "100%"
		}
		const pagetitle = this.props.pagetitle || 'Student List'
		const studentsList = this.props.studentsList || []

		// render subcomponents
		const pageHeader = (
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
		)
		const studentButton = (
					<div className="row tim-row">
						<NavLink to={'/students/new'}>
							<button className="btn btn-danger pull-right">
								Add New Student
							</button>
						</NavLink>
					</div>
		)
		// console.log('studentsList', studentsList)
		const studentRows = studentsList.map(student => makeRow(student, this.props.deleteStudent))

		// finally render the page
		// <div className="section" style={{backgroundColor: "black"}}>
		return (
				<div className="wrapper tutorial-page" style={bgstyle}>
					{pageHeader}

					<div className="main main-raised main-translucent">
						<div className="section">
							<div className="container">
								{studentButton}
								<table className="table">
									<thead>
										<tr>
											<th className="text-center">#</th>
											<th>Name</th>
											<th>Campus</th>
											<th>Joined</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{studentRows}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				)
	}
} 