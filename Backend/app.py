from typing import Optional
from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect, jsonify
from flask_cors import CORS
from urllib.parse import unquote
from sqlalchemy.orm.session import close_all_sessions
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler

from sqlalchemy.exc import IntegrityError

from model import *
from schemas import *

info = Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)


# definindo tags
home_tag = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
users_tag = Tag(name="Users", description="Rotas relacionadas a tabela de Users")
testes_tag = Tag(name="Testes", description="Rotas relacionadas a tabela de Testes")





@app.get('/', tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')

################################################################################################
############################################USERS###############################################
################################################################################################

@app.get('/users', tags=[users_tag])
def getUsers():
    """Busca todos os usuarios da tabela Users
    """
    session = Session()
    usuarios = session.query(Users).all()
    return jsonify({'usuarios': [apresenta_usuario(usuario) for usuario in usuarios]})

@app.post('/user', tags=[users_tag])
def getUser(form: getUserSchema):
    """Busca um usuairo da tabela Users
    """
    email = unquote(unquote(form.email))
    session = Session()
    usuario = session.query(Users).filter(Users.email == email).first()
    if not usuario:
        return {"mesage": "Usuário não encontrado na base"},404
    return jsonify({"usuário": apresenta_usuario(usuario)})


@app.post('/users', tags=[users_tag] , responses={
    "400": ErrorSchema
})
def add_user(form: UsersSchema):
    """Adiciona um novo usuário à base de dados de Users
    """
    print(form.name)
    user = Users(
        uuid = str(uuid.uuid4()),
        email=form.email,
        name=form.name,
        password=generate_password_hash(form.password))
    try:
        # criando conexão com a base
        session = Session()
        # adicionando usuário
        session.add(user)
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        close_all_sessions()
        return {"mesage": "Usuário criado!"}, 200

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"mesage": err}, 400


@app.delete('/users', tags=[users_tag] , responses={
    "400": ErrorSchema
})
def remove_usuario(form: removeUserSchema):
    """remove um usuário à base de dados de Users
    """
    try:
        # criando conexão com a base
        uuid_usuario = unquote(unquote(form.uuid))
        session = Session()
        usuario = session.query(Users).filter(Users.uuid == uuid_usuario).first()
        if not usuario:
            return {"mesage": "Usuário não encontrado na base"},404
        session.query(Users).filter(Users.uuid == uuid_usuario).delete()
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        close_all_sessions()
        return "Usuário deletado da base de dados!", 200

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"mesage": err}, 400

@app.post('/login', tags=[users_tag] , responses={
    "400": ErrorSchema
})
def login_user(form: LoginUserSchema):
    """Faz a autenticação de um usuário na base de dados
    """

    try:
        # criando conexão com a base

        session = Session()
        usuario = session.query(Users).filter_by(email=form.email).first()
        if usuario and check_password_hash(usuario.password, form.password):
            close_all_sessions()
            return {"message": "Login Realizado com sucesso!"}, 200
        else:
            raise ValueError("Email ou senha incorretos!")

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"message": "Erro de integridade na base de dados"}, 400
    except ValueError as e:
        return {"message": str(e)}, 400
    finally:
        session.close()

################################################################################################
############################################TESTES##############################################
################################################################################################

@app.get('/testes', tags=[testes_tag])
def getTestes(session_ext: Optional[Session] = None):
    """Busca todos os itens da tabela Testes
    """
    session = session_ext() if session_ext else Session()
    testes = session.query(Testes).all()
    return jsonify({'testes': [apresenta_teste(teste) for teste in testes]})

@app.post('/teste', tags=[testes_tag])
def getTeste(form: GetTestesSchema ,session_ext: Optional[Session] = None):
    """Busca todos os itens da tabela Testes
    """
    session = session_ext() if session_ext else Session()
    testes = session.query(Testes).filter_by(user_uuid=form.user_uuid).all()
    return jsonify({'testes': [apresenta_teste(teste) for teste in testes]})


@app.post('/testes', tags=[testes_tag] , responses={
    "400": ErrorSchema
})

def add_teste(form: TestesSchema, session_ext: Optional[Session] = None):
    """Adiciona um novo teste à base de dados de Users
    """
    teste = Testes(
        uuid = str(uuid.uuid4()),
        user_uuid = form.user_uuid,
        name = form.name,
        age = form.age ,
        gender = form.gender, 
        height = form.height ,
        weight = form.weight ,
        ap_hi = form.ap_hi ,
        ap_lo = form.ap_lo ,
        cholesterol = form.cholesterol ,
        gluc = form.gluc ,
        smoke = form.smoke ,
        alco = form.alco ,
        active = form.active)
        
    teste.calcIMC()
    try:
        # criando conexão com a base
        session = session_ext() if session_ext else Session()
        # adicionando usuário
        session.add(teste)
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        uuid_gerado = teste.uuid
        close_all_sessions()
        uuid_form = TesteCardioSchema(uuid = uuid_gerado)
        add_testeCardio(uuid_form,session_ext)
        
        return "Usuário criado!", 200

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"mesage": err}, 400
    

@app.post('/testeCardio', tags=[testes_tag] , responses={
    "400": ErrorSchema
})
def add_testeCardio(form: TesteCardioSchema, session_ext: Optional[Session] = None):
    """Adiciona um novo teste à base de dados de Users
    """

    try:
        # criando conexão com a base
        session = session_ext() if session_ext else Session()
        teste = session.query(Testes).filter_by(uuid=form.uuid).first()
        path = 'dataset/classificador.pkl'
        modelo,scaler = ModeloIA.carrega_modelo(path)
        preditor = ModeloIA.preditor(modelo,scaler,teste)
        teste.cardio = int(preditor[0])
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        close_all_sessions()
        return "Usuário analisado!", 200

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"mesage": err}, 400
    

@app.delete('/testes', tags=[testes_tag] , responses={
    "400": ErrorSchema
})
def remove_teste(form: removeTestesSchema, session_ext: Optional[Session] = None):
    """remove um teste à base de dados de testes
    """
    try:
        # criando conexão com a base
        uuid_teste = unquote(unquote(form.uuid))
        session = session_ext() if session_ext else Session()
        teste = session.query(Testes).filter(Testes.uuid == uuid_teste).first()
        if not teste:
            return {"mesage": "Teste não encontrado na base"},404
        session.query(Testes).filter(Testes.uuid == uuid_teste).delete()
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        close_all_sessions()
        return "Teste deletado da base de dados!", 200

    except IntegrityError as e:
        session.rollback()
        err = e.args
        return {"mesage": err}, 400

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)