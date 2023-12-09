from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime, JSON, UUID
from sqlalchemy.sql import func
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.declarative import declarative_base
import uuid
import pytz

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    uuid = Column(String(36), primary_key=True, unique=True)
    name = Column(String(255))
    email = Column(Text, unique=True)
    password = Column(Text)


class Testes(Base):
    __tablename__ = 'testes'
    uuid = Column(String(36), primary_key=True, default=str(uuid.uuid4()), unique=True)
    user_uuid = Column(String(36))
    name = Column(Text)
    data_hora_atual = datetime.utcnow()
    fuso_horario_local = timezone(timedelta(hours=-3))
    data_hora_local = data_hora_atual.replace(tzinfo=timezone.utc).astimezone(fuso_horario_local)
    created_at = Column(DateTime, default=data_hora_local)
    age = Column(Integer)
    gender = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    imc = Column(Text)
    ap_hi = Column(Integer)
    ap_lo = Column(Integer)
    cholesterol = Column(Integer)
    gluc = Column(Integer)
    smoke = Column(Integer)
    alco = Column(Float)
    active = Column(Integer)
    cardio = Column(Integer)

    def calcIMC(self):
        altura = self.height/100
        imc = (self.weight)/(altura*altura)
        if imc < 18.5:
            self.imc= "MAGREZA"
        elif 18.5 <= imc <= 24.9:
            self.imc=  "NORMAL"
        elif 25.0 <= imc <= 29.9:
            self.imc=  "SOBREPESO"
        elif 30.0 <= imc <= 39.9:
            self.imc=  "OBESIDADE"
        else:
            self.imc=  "OBESIDADE GRAVE"

