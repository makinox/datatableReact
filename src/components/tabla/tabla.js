import React, { Component } from 'react'
import './tabla.css'
import {
  InputGroupAddon,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
// import axios from 'axios'

class tabla extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      offset: 0
    }
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.fetchData = this.fetchData.bind(this)
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.fetchData()
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  fetchData(apiMethod = 'users', limitMethod = 10, offsetMethod = 0) {
    fetch(`http://localhost:3001/${apiMethod}/limit=${limitMethod}&offset=${offsetMethod}`)
      .then(res => res.json())
      .then(parsed => {
        console.log(parsed)
        return parsed.map(user => (
          {
            nombre: `${user.nombres}`,
            id: `${user.idUsuarios}`,
            apellido: `${user.apellidos}`,
            contraseña: `${user.contraseña}`,
            email: `${user.email}`
          }
        ))
      })
      .then(data => {
        console.log(data)
        this.setState({
          data,
          limitMethod,
          offsetMethod
        })
      })
      .catch(e => console.log('Paso esto ' + e))
  }

  handleInput(e){
    const { value, name } = e.target
    console.log(value)
    console.log(e.target)
    console.log(name)
    // console.log(e.target.html)
    if (name === 'limite'){
      this.fetchData('users', e.target.value, this.state.offset)
    }
  }

  render() {
    const { data } = this.state;


    return (
      <div>
        <div>
          <div className="row justify-content-between">

            <div className="col col-3">
              <div className="form-group">
                <select name="limite" className="form-control shadows" onChange={this.handleInput}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>

            <div className="col col-5">
              <div className="input-group shadows">
                <InputGroupAddon addonType="prepend"><Button>Buscar</Button></InputGroupAddon>
                <Input />
              </div>
            </div>

          </div>
        </div>

        <table className="table mt-3 table-striped table-hover table-bordered table-light shadows">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((user) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.contraseña}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="row">
          <div className="ml-3">
            <Pagination aria-label="Page navigation example" className="shadows">
              <PaginationItem disabled>
                <PaginationLink previous />
              </PaginationItem>
              <PaginationItem >
                <PaginationLink >
                  1
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink >
                  2
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink >
                  3
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink >
                  4
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink >
                  5
            </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default tabla;