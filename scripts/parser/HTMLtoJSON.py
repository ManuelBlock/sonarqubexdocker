# coding: utf-8
#!/usr/bin/env python

"""JSONtoCSV.py: Parsea el fichero JSON resultante de un escaneo con SonarQube y lo convierte en un fichero CSV (informe)."""

__author__ = "David Vázquez Pesado"
__email__ = "david.vazquez.pesado@everis.com"
__maintainer__ = "David Vázquez Pesado"
__department__ = "Ciberseguridad"
__version__ = "1.0"
__status__ = "development"

import csv
import json

def toCSV(json):
    
    f = csv.writer(open("resultados.csv", 'w', newline=''))

    #Cabeceras del CSV
    f.writerow(["Riesgo", "Vulnerabilidad", "Tipo", "Tecnología", "Descripción", "Solución", "Archivos afectados", "Línea afectada", "CWE" ])
    #Se recorre el JSON y se mapean los campos
    for i in range (0, len(json)):
        f.writerow([json[i]["vulnerabilityProbability"], json[i]["securityCategory"], "", "", json[i]["message"],str(json[i]["solution"].replace("\n","")), json[i]["component"], json[i]["line"], str(json[i]["cwe"]).strip('[]').replace("'","") ])
                    
                    
if __name__ == "__main__":
    with open('allRecords.json') as data:
        json = json.load(data)
    #print(len(json))
    
    toCSV(json)
    print("Para darle formato al Excel, abrir el fichero con un editor y cambiar todas ',' por ';' ")  
    