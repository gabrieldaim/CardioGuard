from pydantic import BaseModel
from model import *

class TestesSchema(BaseModel):
    user_uuid: str
    name: str
    age: int
    gender: int
    height: float
    weight: float
    ap_hi: int
    ap_lo: int
    cholesterol: int
    gluc: int
    smoke: int
    alco: float
    active: int

class TesteCardioSchema(BaseModel):
    uuid: str

class removeTestesSchema(BaseModel):
    uuid: str

class GetTestesSchema(BaseModel):
    user_uuid: str

# Função para converter um objeto Testes para um dicionário compatível com o schema
def apresenta_teste(teste: Testes):
    return {
        "uuid": teste.uuid,
        "user_uuid": teste.user_uuid,
        "name": teste.name,
        "created_at": teste.created_at,
        "age": teste.age,
        "gender": teste.gender,
        "height": teste.height,
        "weight": teste.weight,
        "imc": teste.imc,
        "ap_hi": teste.ap_hi,
        "ap_lo": teste.ap_lo,
        "cholesterol": teste.cholesterol,
        "gluc": teste.gluc,
        "smoke": teste.smoke,
        "alco": teste.alco,
        "active": teste.active,
        "cardio": teste.cardio
    }