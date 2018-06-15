import React, { Component } from 'react'
import './tabla.css'
import { InputGroupAddon, Input, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import axios from 'axios'

class tabla extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      api: '',
      limit: 0,
      offset: 0,
      esp: ''
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

  fetchData(apiMethod = 'users', limitMethod = 10, offsetMethod = 0, especial = '') {
    let queryString = `http://localhost:3001/${apiMethod}/limit=${limitMethod}&offset=${offsetMethod}${especial}`
    console.log(queryString)
    fetch(queryString)
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
        // console.log(data)
        this.setState({
          data: data,
          api: apiMethod,
          limit: limitMethod,
          offset: offsetMethod,
          esp: especial
        })
      })
      .catch(e => console.log('Paso esto ' + e))
  }

  handleInput(e) {
    const { value, name } = e.target
    console.log(e)
    console.log(value)
    console.log(e.target)
    console.log(name)
    
    // Si se clicko limite sus valores son 10, 25, 50
    if (name === 'limite') {
      this.fetchData(this.state.api, e.target.value, this.state.offset)
      
      // Si se entro a buscar y se entro una letra
    } else if (name === 'buscar') {

      //Si hay algún valor en el campo de texto
      if (value) {
        this.fetchData('usersSEARCH', this.state.limit, this.state.offset, `&search=${value}`)

        //Si se modifico el campo pero no hay ningún valor disponible en el campo 
      } else {
        this.fetchData('users', this.state.limit, this.state.offset)
      }

      // Si se clicka en el boton (Anterior)
    } else if (name === 'anterior') {
      
      // Si hay registros anteriores en la pagina dada y su valor es mayor a cero
      if (this.state.offset > 1 && (parseInt(this.state.offset, 10) - parseInt(this.state.limit, 10)) > 0) {
        this.fetchData(this.state.api, this.state.limit, (parseInt(this.state.offset, 10) - parseInt(this.state.limit, 10)))

        // Si el valor de la paginacion es menor o igual a cero
      } else {
        this.fetchData(this.state.api, this.state.limit, (0))
      }
      
      //Si se clicka en el boton (siguiente)
    } else if (name === 'siguiente') {
      this.fetchData(this.state.api, this.state.limit, (parseInt(this.state.offset, 10) + parseInt(this.state.limit, 10)))
    }
  }

  render() {
    const { data, offset } = this.state;


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
                <Input onChange={this.handleInput} name="buscar" />
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
              <PaginationItem >
                <a className="page-link" name="anterior" value="0" onClick={this.handleInput}>Anterior</a>
              </PaginationItem>
              <PaginationLink value={(offset + 10) / 10} name="numPage" >
                  {(offset + 10) / 10}
              </PaginationLink>
              {/* <PaginationItem >
                <PaginationLink value={(offset + 10) - 9} name="numPage" onClick={this.handleInput}>
                  {(offset + 10) - 9}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink value={(offset + 10) - 8} name="numPage" onClick={this.handleInput}>
                  {(offset + 10) - 8}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink value={(offset + 10) - 7} name="numPage" onClick={this.handleInput}>
                  {(offset + 10) - 7}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink value={(offset + 10) - 6} name="numPage" onClick={this.handleInput}>
                  {(offset + 10) - 6}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink value={(offset + 10) - 5} name="numPage" onClick={this.handleInput}>
                  {(offset + 10) - 5}
                </PaginationLink>
              </PaginationItem> */}
              <PaginationItem>
                <a className="page-link" name="siguiente" value="0" onClick={this.handleInput}>Siguiente</a>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default tabla;