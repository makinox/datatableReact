import React, { Component } from 'react'
import axios from 'axios'

class tabla extends Component {
	constructor() {
		super()

		this.state = {
			tablita: Array
		}

		console.log(this.state)
	}

	autoInvoke = () => {
		axios.get('http://localhost:3001/users/limit=10&offset=0')
			.then((response) => {
				console.log(response.data)
				this.setState({ tablita: response.data })
			})
		console.log(this.state.tablita)
	}

	render() {
		console.log(this.state)
		const datos = this.state.tablita.map((registro, index) => {
			return (
				<tr className="index">
					<td className="row" key={index}>{registro.idUsuarios}</td>
					<th>{registro.nombre}</th>
					<th>{registro.apellidos}</th>
					<th>{registro.contraseña}</th>
					<th>{registro.email}</th>
				</tr>
			)
		})

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
						{/* {datos} */}
					</tbody>
				</table>
			</div>
		)
	}
}

export default tabla;