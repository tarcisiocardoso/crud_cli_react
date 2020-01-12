import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';


class ClienteList extends Component {

  constructor(props) {
    super(props);
    this.state = {clientes: [], isLoading: true};
    this.remove = this.remove.bind(this);
    this.mtel = this.mtel.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/clientes')
      .then(response => response.json())
      .then(data => this.setState({clientes: data, isLoading: false}));
  }
  mtel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
  }

  async remove(id) {
    await fetch(`/api/cliente/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.clientes].filter(i => i.id !== id);
      this.setState({clientes: updatedGroups});
    });
  }

  render() {
    const {clientes, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    let acesso = localStorage.getItem("acesso");

    const clienteList = clientes.map(cliente => {
      const endereco = `${cliente.logradouro || ''} ${cliente.cidade || ''} ${cliente.uf || ''}`;
      return <tr key={cliente.id}>
        <td style={{whiteSpace: 'nowrap'}}>{cliente.nome}</td>
        <td>{endereco}</td>
        <td>
        {cliente.telefone.map(event => {
          return <div key={event.id}>{ event.tipo}: { this.mtel(event.numero)}</div>
        })} 
        </td>
        {( acesso === 'adm' )?
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/clientes/" + cliente.id}>Modifica</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(cliente.id)}>Remove</Button>
          </ButtonGroup>
        </td>
        :<td/>
        }
      </tr>
    });

    
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            { ( acesso === 'adm' )?<Button color="success" tag={Link} to="/clientes/new">Novo Cliente</Button>:''}
          </div>
          <h3>Lista de Cliente</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nome</th>
              <th width="30%">Endereço</th>
              <th>Telefone</th>
              { ( acesso === 'adm' )?<th width="10%">Ação</th>:<th/>}
            </tr>
            </thead>
            <tbody>
            {clienteList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withCookies(ClienteList);
