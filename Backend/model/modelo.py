import pickle
import pandas as pd


class ModeloIA:
    def carrega_modelo(path):
        pickle_in = open(path, 'rb')
        save = pickle.load(pickle_in)
        model = save['model']
        scaler = save['scaler']
        return model,scaler
    
    def preditor(model,scaler,teste):
        testeDic = {
        "age": teste.age ,
        "gender": teste.gender, 
        "height": teste.height ,
        "weight": teste.weight ,
        "ap_hi": teste.ap_hi ,
        "ap_lo": teste.ap_lo ,
        "cholesterol": teste.cholesterol ,
        "gluc": teste.gluc ,
        "smoke": teste.smoke ,
        "alco": teste.alco ,
        "active": teste.active
        }
        entrada = pd.DataFrame([testeDic])
        array_entrada = entrada.values
        resultado = model.predict(scaler.transform(array_entrada))
        return resultado

    