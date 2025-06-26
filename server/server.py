from flask import Flask, jsonify, make_response
import sqlite3
import os

app = Flask(__name__, static_folder='static')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'database', 'database.sqlite')


def query_db(query):
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    con.close()
    return [dict(row) for row in rows]

@app.route('/api/sorten')
def get_sorten():
    data = query_db('SELECT * FROM Sorten')
    return jsonify(data)

@app.route('/api/preise')
def get_preise():
    data = query_db('SELECT * FROM Preise')
    return jsonify(data)

@app.route('/api/bestseller')
def get_bestseller():
    query = '''
    SELECT 
        Name, 
        Foto, 
        Gen, 
        THC, 
        Terpene, 
        ErtragIndoor, 
        ErtragOutdoor, 
        Blütezeit
    FROM Sorten
    '''
    data = query_db(query)
    
    preise = query_db('SELECT Typ, Menge, Preis FROM Preise')
    preise_map = {}
    for p in preise:
        if p['Typ'] not in preise_map:
            preise_map[p['Typ']] = []
        preis_mit_komma = f"{float(p['Preis']):.2f}".replace('.', ',')
        preise_map[p['Typ']].append(f"{p['Menge']} - {preis_mit_komma}€")

    for eintrag in data:
        typ = 'Automatic' if 'auto' in eintrag['Name'].lower() else 'Regular'
        eintrag['Preise'] = preise_map.get(typ, [])

    response = make_response(jsonify(data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=6401)