import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import { Container, FormGroup, Input, Label } from 'reactstrap';

  
class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showMsgErro: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
    async loginClicked() {
        const { username, password } = this.state;

        let user = {
            login: username,
            pws: password
        }
        
        const resposta = await (await fetch('/api/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })).json();

        if( resposta.success ){
            localStorage.setItem('acesso', resposta.acesso);
            this.props.history.push('/');
        }else{
            this.setState({showMsgErro:resposta.msg})
            this.setState({hasLoginFailed:true})
        }

    }
    render() {
        return (
            
            <Container>
                    <h3>Informações de acesso</h3>
                        <div>
                        Tela de login simples para atender a prova. Existem apenas dois usuários:
                        <ul>
                            <li><b>admin</b> Usuario com acesso de administrador do sistema.</li>
                            <li><b>comum</b> Usuário com acesso de leitura no sistema</li>
                        </ul>
                        </div>                    
                <h1>Login</h1>
                <br/>
                <FormGroup>
                    <Label for="username">Login</Label>
                    <Input type='text' name='username' id='username' value={this.state.username} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Login</Label>
                    <Input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} required/>
                </FormGroup>

                <button className="btn btn-success" onClick={this.loginClicked} disabled={ !(this.state.username && this.state.password) } >Login</button>
{this.state.hasLoginFailed && <div className="alert alert-warning">{this.state.showMsgErro}</div>}
            </Container>
        )
    }
}
export default withCookies(LoginComponent)
