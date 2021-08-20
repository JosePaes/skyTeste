# API para autenticação utilizando JWT

## Teste para processo seletivo

### Stack utilizada

* NodeJs
* Express
* Mongodb as service (Atlas)


### Rodando localmente

1. Clone o repositorio com o comando abaixo:

> git clone https://github.com/JosePaes/skyTeste.git

2. Após o download entre no diretório clonado.

> cd skyTeste

3. Instale as dependências do projeto com o comando abaixo:

> npm install

4. Rode a aplicação com o comando abaixo:

> npm start

5. Criar arquivo .env para informar as informações de acesso ao BD e a chave do token JWT, conforme o arquivo .env.example

### Disponível em:

> https://skyteste.herokuapp.com/

### Rotas

#### Criação de usuário

>POST EM https://skyteste.herokuapp.com/users/create

Exemplo:

```json
{
    "nome":"Exemplo",
    "email": "exemplo@exemplo.com",
    "senha": "123456",
    "telefones": [
        {
            "ddd":"11",
            "numero":"70707007"
        },
        {
            "ddd":"11",
            "numero":"70707070"
        }
    ]
}
```

#### Sign In

>POST EM https://skyteste.herokuapp.com/users/sign

Exemplo:

```json
{
    "email":"exemplo@exemplo.com",
    "senha":"123456"
}
```

Após o login a API retornará um json com a representação do usuário contendo o **_id** e o **token** jwt. Essas informações serão necessárias para acessar a rota de listagem de usuários.

#### Listagem de usuários

>GET EM https://skyteste.herokuapp.com/users/list/{ _id }

* O acesso dessa rota é permitido apenas pra quem realizou login e possui um token válido.
* Usuários deverão ter feito login a menos de 30 minutos para acessar essa rota.
* O _id do usuário deverá ser fornecido na rota /users/list/_id.
* O token deve ser passado no header da requisição com o nome "authorization".
