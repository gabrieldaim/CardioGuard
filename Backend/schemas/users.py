from pydantic import BaseModel
from model import *

class UsersSchema(BaseModel):
    name: str
    email: str
    password: str

class removeUserSchema(BaseModel):
    uuid: str

class getUserSchema(BaseModel):
    email: str

class LoginUserSchema(BaseModel):
    email: str
    password: str

# Função para converter um objeto Users para um dicionário compatível com o schema
def apresenta_usuario(usuario: Users):
    return {
        "uuid": usuario.uuid,
        "name": usuario.name,
        "email": usuario.email,
    }

