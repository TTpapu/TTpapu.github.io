from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

def create_memes_folders():
    try:
        # Cambiar la ruta para crear 'memes' dentro de 'Web'
        os.makedirs('Web/memes', exist_ok=True)

        start_year = 2016
        end_year = 2024
        months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
                  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

        for year in range(start_year, end_year + 1):
            for month in months:
                path = os.path.join('Web/memes', str(year), month)
                os.makedirs(path, exist_ok=True)
        print("Carpetas creadas con éxito.")
        
    except Exception as e:
        print(f"Error al crear carpetas: {e}")

@app.route('/memes/<int:year>/<int:month>', methods=['GET'])
def get_memes(year, month):
    months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
              "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    if month < 1 or month > 12:
        return jsonify({"error": "Mes no válido"}), 400

    month_name = months[month - 1]
    memes_path = f'Web/memes/{year}/{month_name}'
    
    if not os.path.exists(memes_path):
        return jsonify({"error": "No memes found for this date"}), 404
    
    memes = [filename for filename in os.listdir(memes_path) 
             if filename.endswith(('.jpg', '.png', '.gif', '.mp4', '.mov'))]
    return jsonify(memes)

@app.route('/memes/<int:year>/<int:month>/<filename>', methods=['GET'])
def get_meme(year, month, filename):
    months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
              "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    if month < 1 or month > 12:
        return jsonify({"error": "Mes no válido"}), 400

    month_name = months[month - 1]
    return send_from_directory(f'Web/memes/{year}/{month_name}', filename)

if __name__ == '__main__':
    create_memes_folders()  # Crear las carpetas al inicio
    app.run(debug=True)
