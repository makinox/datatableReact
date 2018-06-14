import React, { Component } from 'react'
import './tabla.css'
import {
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
// import axios from 'axios'

class tabla extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
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

  fetchData() {
    fetch('http://localhost:3001/users/limit=10&offset=0')
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
          data
        })
      })
      .catch(e => console.log('Paso esto ' + e))
  }

  render() {
    const { data } = this.state;


    return (
      <div>
        <div>
          <div className="row justify-content-between">

            <div className="col col-4">
              <div className="input-group">
                <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                  <DropdownToggle caret className="shadows">
                    Datos mostrados
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem >10</DropdownItem>
                    <DropdownItem>25</DropdownItem>
                    <DropdownItem>50</DropdownItem>
                    <DropdownItem>100</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
              </div>
            </div>

            <div className="col col-4">
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
          <div className="col">
            <Pagination aria-label="Page navigation example" className="shadows">
              <PaginationItem disabled>
                <PaginationLink previous  />
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
                <PaginationLink next  />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default tabla;