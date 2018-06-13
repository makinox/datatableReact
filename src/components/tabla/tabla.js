import React, { Component } from 'react'
import axios from 'axios'

class tabla extends Component {
	constructor() {
		super()
		this.state = {
			tablita: Object
		}
	}

	autoInvoke() {
		axios.get('http://localhost:3001/users/limit=10&offset=0')
			.then((response) => {
				console.log(response.data)
				// this.setState({ tablita: response.data})
			})
	}

	render() {
		return (

			<div>
				<button className="btn btn-primary mt-3" onClick={this.autoInvoke}>click</button>
				<table className="table mt-3">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nombre</th>
							<th scope="col">Apellido</th>
							<th scope="col">Contraseña</th>
							<th scope="col">Email</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="row"></td>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default tabla;