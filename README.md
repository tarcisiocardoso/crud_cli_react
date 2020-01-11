# crud_cli_react
Crud para desafio react

O crud é dividido em dois projetos: front e back

O back fica no diretório crud_cliente e utiliza o maven como gerenciador de projetos

O Front fica no diretório front e pode ser utilizado o yarn ou qualquer gerenciador de projeto compativel com react

### Instrução para execução

Fazer clone do projeto:
`git clone https://github.com/tarcisiocardoso/crud_cli_react`

Ir para o diretorio crud_cliente:
`cd crud_cliente`

Esse é o back com spring boot. Executar o seguinte comando para iniciar o back:
`mvnw spring-boot:run`

O serviço back pode ser acessado pelo link:

[http://localhost:8080/api/clientes](http://localhost:8080/api/clientes)

Esse acessa a api buscando todos os clientes no formato json

Após esse ponto vá para o diretório do front:
 `../../front`
 
Em seguida poderá ser iniciado o serviço do front. Primeiro instale as dependencias:

`yarn install`

Depois inicie o serviço

`yarn start`

Aguarde ate que o navegador seja carregado

### Comandos
Criação do front-end e bibliotecas

`yarn create react-app front`

`cd front`
`yarn add bootstrap@4.1.3 react-cookie@3.0.4 react-router-dom@4.3.1 reactstrap@6.5.0`
`yarn add react-masked-field`

`yarn start`
