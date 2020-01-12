import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table, FormFeedback, ButtonGroup } from 'reactstrap';
import AppNavbar from './AppNavbar';
import MaskedField from 'react-masked-field';
import {withCookies } from 'react-cookie';

class ClienteEdit extends Component {

  emptyItem = {
    nome: '',
    cpf: '',
    logradouro: '',
    cidade: '',
    bairro: '',
    uf: '',
    cep: '',
    estado: '',
    telefone: [],
    email: []
  };

  constructor(props) {
    super(props);
    this.state = {
      formInvalid: {
        cpfInvalid: false, nomeInvalid: false, emailInvalid: false,
        enderecoInvalid: false, telefoneInvalid: false, msgNome: ''
      },
      item: this.emptyItem,
      tel: { id: 0, numero: '', tipo: 'Celular' },
      email: { id: 0, email: '', invalid: false, msg: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.consultaCep = this.consultaCep.bind(this);
    this.addTelefone = this.addTelefone.bind(this);
    this.handleChangeTelefone = this.handleChangeTelefone.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.formInvalidate = this.formInvalidate.bind(this);
    this.removeTel = this.removeTel.bind(this);
    this.validacaoEmail = this.validacaoEmail.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const cliente = await (await fetch(`/api/cliente/${this.props.match.params.id}`)).json();
      this.setState({ item: cliente });
    }
  }


  async consultaCep(e) {
    let item = { ...this.state.item };
    let formInvalid = { ...this.state.item };

    if (item.cep) {
      const cep = await (await fetch(`https://viacep.com.br/ws/${item.cep}/json/`)).json();
      // this.setState({ item: cliente });
      item.bairro = cep.bairro;
      item.logradouro = cep.logradouro;
      item.cidade = cep.localidade;
      item.uf = cep.uf;
      this.setState({ item: item });

      if (!item.cep || item.cep.length > 0) {
        formInvalid.enderecoInvalid = false;
        this.setState({ formInvalid });
      }
    }
  }
  removeEmail(index) {
    let item = { ...this.state.item };
    item.email.splice(index, 1);
    this.setState({ item: item });
  }
  removeTel(index) {
    let item = { ...this.state.item };
    item.telefone.splice(index, 1);
    this.setState({ item: item });
  }
  addEmail(e) {
    const { item, formInvalid, email } = this.state;
    // let emailValid = this.state.emailValid;
    
    if (email.email.length === 0) {
      email.invalid = true;
      email.msg = 'Informe o email';
      this.setState({ email: email });
      return;
    }else if( this.validacaoEmail(email.email) ){
      email.invalid = true;
      email.msg = 'Email inválido';
      this.setState({ email: email });
      return;
    }

    item.email.push(email.email);
    this.setState({ item: item });
    this.setState({ email: { id: 0, email: '', invalid: false } });

    formInvalid.emailInvalid = false;
    this.setState({ formInvalid });
  }
  addTelefone(e) {
    let { item, formInvalid, tel } = this.state;

    tel.id = item.telefone.length;
    // item.telefone.push(tel);
    item.telefone.push(
      {
        numero: tel.numero,
        tipo: tel.tipo
      }
    );
    formInvalid.telefoneInvalid = false;

    tel = { id: 0, numero: '', tipo: 'Celular' };
    this.setState({ item: item });
    this.setState({ formInvalid });
    this.setState({ tel });
  }
  handleChangeEmail(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let email = { ...this.state.email };
    email[name] = value;
    this.setState({ email });
  }
  handleChangeTelefone(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let tel = { ...this.state.tel };
    tel[name] = value;
    this.setState({ tel });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });

  }
  validacaoEmail(email) {
    
    let invalido = true;
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);
    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search("@") === -1) &&
      (dominio.search("@") === -1) &&
      (usuario.search(" ") === -1) &&
      (dominio.search(" ") === -1) &&
      (dominio.search(".") !== -1) &&
      (dominio.indexOf(".") >= 1) &&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
      invalido = false;
    }
    return invalido;
  }

  formInvalidate() {
    let { item, formInvalid } = this.state;
    formInvalid = { cpfInvalid: false, nomeInvalid: false, emailInvalid: false, enderecoInvalid: false }

    let invalid = false;
    if (!item.nome || item.nome.length === 0) {
      formInvalid.nomeInvalid = true;
      invalid = true;
      formInvalid.msgNome = 'Nome é obrigatório';
    } else if (item.nome.length < 3 || item.nome.length > 100) {
      formInvalid.nomeInvalid = true;
      invalid = true;
      formInvalid.msgNome = 'Nome deve ter entre 3 a 100 caracteres';
    }

    const cpfPuro = item.cpf.replace(/\D+/g, '');
    if (!cpfPuro || cpfPuro.length === 0) {
      formInvalid.cpfInvalid = true;
      invalid = true;
    }
    if (!item.email || item.email.length === 0) {
      formInvalid.emailInvalid = true;
      invalid = true;
    }


    if (!item.cep || item.cep.length === 0) {
      formInvalid.enderecoInvalid = true;
      invalid = true;
    }

    if (!item.telefone || item.telefone.length === 0) {
      formInvalid.telefoneInvalid = true;
      invalid = true;
    }
    this.setState({ formInvalid });
    return invalid;
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    if (this.formInvalidate()) return;

    await fetch('/api/cliente' + ((item.id) ? '/' + item.id.toString() : ''), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
      credentials: 'include'
    });
    this.props.history.push('/clientes');
  }

  render() {
    const { item, tel, email, formInvalid } = this.state;
    const title = <h2>{item.id ? 'Editar Cliente' : 'Novo Cliente'}</h2>;

    const telList = item.telefone.map((fone, index) => {
      const numero = `${fone.numero || ''}`;
      const tipo = `${fone.tipo || ''}`;
      return <tr key={index}>
        <td style={{ whiteSpace: 'nowrap' }}>{tipo}</td>
        <td>{numero}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.removeTel(index)}>-</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    const emailElement = item.email.map((email, index) => {

      return <tr key={index}>
        <th scope="row">{index}</th>
        <td>{email}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.removeEmail(index)}>-</Button>
          </ButtonGroup>
        </td>
      </tr>
    });


    return <div>
      <AppNavbar />
      <Container>
        <center>{title}</center>

        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <FormGroup className="col-6 mb-2">
              <Label for="nome">Nome</Label>
              <Input type="text" name="nome" id="nome" value={item.nome || ''}
                onChange={this.handleChange} autoComplete="nome" invalid={formInvalid.nomeInvalid} />
              <FormFeedback>{formInvalid.msgNome}</FormFeedback>
            </FormGroup>
            <FormGroup className="col-6 mb-2">
              <Label for="cpf">CPF</Label>
              <Input type="hidden" name="cpfHidden" id="cpfHidden" invalid={formInvalid.cpfInvalid} />
              <MaskedField className="form-control" mask="999.999.999-99" name="cpf" id="cpf" value={item.cpf}
                onChange={this.handleChange} autoComplete="cpf" />
              {/* <Input type="text" name="cpf" id="cpf" value={item.cpf || ''}
                onChange={this.handleChange} autoComplete="cpf" invalid={formInvalid.cpfInvalid} /> */}
              <FormFeedback>CPF obrigatório</FormFeedback>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type='hidden' name='listaEmail' id='listaEmail' invalid={formInvalid.emailInvalid} />
            <div className="row">
              <FormGroup className="col-11 mb-2">
                <Input type="email" name="email" id="email" value={email.email || ''}
                  onChange={this.handleChangeEmail} autoComplete="email" invalid={email.invalid} />
                <FormFeedback>{email.msg}</FormFeedback>
              </FormGroup>
              <FormGroup className="col-1 mb-2">
                <Button size="sm" color="success" onClick={() => this.addEmail()}>+</Button>
              </FormGroup>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {emailElement}
              </tbody>
            </Table>
            <FormFeedback>Ao menos um email deve ser informado</FormFeedback>
          </FormGroup>


          <FormGroup>
            <h4>Endereço</h4>
            <Input type='hidden' name='endereco' id='endereco' invalid={formInvalid.enderecoInvalid} />
            <div className="row">
              <FormGroup className="col-4 mb-3">
                <Label for="country">CEP</Label>
                <MaskedField className="form-control" mask="99999-999" name="cep" id="cep" value={item.cep} onChange={this.handleChange} autoComplete="cep" onBlur={this.consultaCep} />
              </FormGroup>

              <FormGroup className="col-6 mb-3">
                <Label for="country">Estado</Label>
                <Input type="text" name="estado" id="cep" value={item.estado || ''}
                  onChange={this.handleChange} autoComplete="address-level1" />
              </FormGroup>

              <FormGroup className="col-2 mb-3">
                <Label for="uf">UF</Label>
                <Input type="text" name="uf" id="uf" value={item.uf || ''}
                  onChange={this.handleChange} autoComplete="address-level1" disabled />
              </FormGroup>

            </div>
            <div className="row">
              <FormGroup className="col-6 mb-2">
                <Label for="logradouro">Logradouro</Label>
                <Input type="text" name="logradouro" id="logradouro" value={item.logradouro || ''}
                  onChange={this.handleChange} autoComplete="address-level1" disabled />
              </FormGroup>
              <FormGroup className="col-6 mb-2">
                <Label for="bairro">Bairro</Label>
                <Input type="text" name="bairro" id="bairro" value={item.bairro || ''}
                  onChange={this.handleChange} autoComplete="bairro" disabled />
              </FormGroup>
            </div>
            <FormGroup>
              <Label for="cidade">Cidade</Label>
              <Input type="text" name="cidade" id="cidade" value={item.cidade || ''}
                onChange={this.handleChange} autoComplete="address-level1" disabled />
            </FormGroup>
            <FormFeedback>Endereço preenchimento obrigatório</FormFeedback>
          </FormGroup>

          <div>
            <FormGroup>
              <h4>Telefones</h4>
              <Input type='hidden' name='validarTelefone' id='validarTelefone' invalid={formInvalid.telefoneInvalid} />

              <div className="row">
                <FormGroup className="col-3 mb-3">
                  <Label for="tipo">Tipo</Label>
                  <Input type="select" name="tipo" id="tipo" value={tel.tipo || ''}
                    onChange={this.handleChangeTelefone} autoComplete="tipo">
                    <option>Celular</option>
                    <option>Residencial</option>
                    <option>Trabalho</option>
                  </Input>

                </FormGroup>

                <FormGroup className="col-6 mb-3">
                  <Label for="numero">numero</Label>
                  <MaskedField className="form-control" mask="(999)9999-9999" name="numero" id="numero" value={tel.numero || ''} onChange={this.handleChangeTelefone} autoComplete="numero" />

                </FormGroup>
                <FormGroup className="col-3 mb-3" >
                  <div className="ajuste">
                    <Button color="secondary" onClick={this.addTelefone} >Incluir</Button>
                  </div>
                </FormGroup>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Numero</th>
                    <th>Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {telList}
                </tbody>
              </Table>
              <FormFeedback>Ao menos um número de telefone deve ser informado</FormFeedback>
            </FormGroup>
          </div>

          <FormGroup>
            <Button color="primary" type="submit">Salva</Button>{' '}
            <Button color="secondary" tag={Link} to="/clientes">Cancela</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withCookies(withRouter(ClienteEdit));
