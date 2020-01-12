import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: { nome: '', id: -1 }
    };

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/api/userInfo', { credentials: 'include' });
        const body = await response.text();
        const user = JSON.parse(body);
        let isAuthenticated = true;

        if (!user || user.id === -1) {
            isAuthenticated = false;
        } else {

        }
        this.setState({ isAuthenticated: isAuthenticated, user: user })
    }
    login() {
        this.props.history.push('/login');
    }

    logout() {
        fetch('/api/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(res => res.json())
            .then(response => {
                localStorage.removeItem('acesso');
                let port = (window.location.port ? ':' + window.location.port : '');
                window.location.href = '//' + window.location.hostname + port + '/';
            });
    }

    render() {
        const message = this.state.user.id !== -1 ?
            <h3>Bem vindo {this.state.user.nome}, voce tem acesso de {this.state.user.acesso === 'adm' ? 'Adiministrador' : this.state.user.acesso} no sistema.</h3> :
            <p>Por favor faça login para ter acesso ao sistema.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/clientes">{this.state.user.acesso === 'adm' ? 'Adiministrar' : 'Lista de'} Cliente Cadastrados</Link></Button>
                <br />
                <Button color="link"><Link to="/logs">Auditoria</Link></Button>
                <br />
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    {message}
                    {button}
                </Container>
            </div>
        );
    }
}

export default withCookies(Home);