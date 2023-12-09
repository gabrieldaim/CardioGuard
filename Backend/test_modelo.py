from model.avaliador import Avaliador
from model.carregador import Carregador
from model.modelo import ModeloIA

# Instanciação das Classes
carregador = Carregador()
modelo = ModeloIA()
avaliador = Avaliador()

# Parâmetros    
url_dados = "dataset/cardio_train.csv"
colunas = ["id","age","gender","height","weight","ap_hi","ap_lo","cholesterol","gluc","smoke","alco","active","cardio"]

# Carga dos dados
dataset = carregador.carregar_dados(url_dados, colunas)

# Separando em dados de entrada e saída
X = dataset.iloc[:, 1:-1]
Y = dataset.iloc[:, -1]
    
# Método para testar o modelo de Regressão Logística a partir do arquivo correspondente
def test_modelo_lr():  
    # Importando o modelo de regressão logística
    lr_path = 'dataset/classificador.pkl'
    modelo_lr,scale = ModeloIA.carrega_modelo(lr_path)

    # Obtendo as métricas da Regressão Logística
    acuracia_lr, recall_lr, precisao_lr, f1_lr = avaliador.avaliar(modelo_lr, X, Y)
    
    # Testando as métricas da Regressão Logística 
    # Modifique as métricas de acordo com seus requisitos
    assert acuracia_lr >= 0.4 
    assert recall_lr >= 0.4 
    assert precisao_lr >= 0.4 
    assert f1_lr >= 0.4 
 
# Método para testar modelo SVC a partir do arquivo correspondente
def test_modelo_svc():
    # Importando modelo de SVC
    svc_path = 'dataset/classificador.pkl'
    modelo_svc,scale = ModeloIA.carrega_modelo(svc_path)

    # Obtendo as métricas do svc
    acuracia_svc, recall_svc, precisao_svc, f1_svc = avaliador.avaliar(modelo_svc, X, Y)
    
    # Testando as métricas do svc
    # Modifique as métricas de acordo com seus requisitos
    assert acuracia_svc >= 0.4
    assert recall_svc >= 0.4 
    assert precisao_svc >= 0.4 
    assert f1_svc >= 0.4 
    
