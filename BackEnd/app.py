from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
import psycopg2
from config import config
from conectDb import connect

app = Flask(__name__)
 
@app.route('/')
def home():
    return 'Hello bro'

@app.route("/create_peserta", methods=['POST'])
def create_peserta():
    nama = request.form['nama']
    alamat = request.form['alamat']
    email = request.form['email']
    telp = request.form['telp']
    
    sql = "INSERT INTO peserta(nama, alamat, email, telp, delete_status) VALUES('"+ nama +"', '"+ alamat +"', '"+ email +"', '"+ telp +"', '0') RETURNING no_peserta;"
    no_peserta = connect(sql, 'POST')
 
    return str(no_peserta)

@app.route("/update_peserta", methods=['PUT'])
def update_peserta() :
    no_peserta = request.form['no_peserta']
    nama = request.form['nama']
    alamat = request.form['alamat']
    email = request.form['email']
    telp = request.form['telp']

    sql = "UPDATE peserta SET nama = '"+ nama +"', alamat = '"+ alamat +"', email = '"+ email +"', telp = '"+ telp +"', delete_status = 0 WHERE no_peserta = '"+ no_peserta +"' RETURNING no_peserta;"
    no_peserta = connect(sql, 'PUT')
 
    return str(no_peserta)

@app.route("/delete_peserta", methods=['PUT'])
def delete_peserta() :
    no_peserta = request.form['no_peserta']

    sql = "UPDATE peserta SET delete_status = 1 WHERE no_peserta = '"+ no_peserta +"' RETURNING no_peserta;"
    no_peserta = connect(sql, 'PUT')
 
    return str(no_peserta)

@app.route("/get_peserta", methods=['GET'])
def get_peserta() :
    sql = "SELECT * FROM peserta WHERE delete_status = 0;"
    result = connect(sql, 'GET')
    return str(result)

@app.route("/get_peserta_by_id", methods=['POST'])
def get_peserta_by_id() :
    no_peserta = request.form['no_peserta']

    sql = "SELECT nama, alamat, email, telp FROM peserta WHERE no_peserta = '"+ no_peserta +"';"
    result = connect(sql, 'GET')
    return str(result)


@app.route("/create_skema", methods=['POST'])
def create_skema():
    nama_skema = request.form['nama_skema']
    ruang = request.form['ruang']

    sql = "INSERT INTO skema(nama_skema, ruang, delete_status) VALUES('"+ nama_skema +"', '"+ ruang +"', '0') RETURNING no_skema;"
    result = connect(sql, 'POST')
    
    return str(result)

@app.route("/update_skema", methods=['PUT'])
def update_skema() :
    no_skema = request.form['no_skema']
    nama_skema = request.form['nama_skema']
    ruang = request.form['ruang']
    
    sql = "UPDATE skema SET nama_skema = '"+ nama_skema +"', ruang = '"+ ruang +"', delete_status = 0 WHERE no_skema = '"+ no_skema +"' RETURNING no_skema;"
    result = connect(sql, 'PUT')
    
    return str(result)

@app.route("/delete_skema", methods=['PUT'])
def delete_skema() :
    no_skema = request.form['no_skema']

    sql = "UPDATE skema SET delete_status = 1 WHERE no_skema = '"+ no_skema +"' RETURNING no_skema;"
    result = connect(sql, 'PUT')
    
    return str(result)

@app.route("/get_skema", methods=['GET'])
def get_skema() :
    sql = "SELECT * FROM skema WHERE delete_status = 0;"
    result = connect(sql, 'GET')
    return str(result)

@app.route("/get_skema_by_id", methods=['POST'])
def get_skema_by_id() :
    no_skema = request.form['no_skema']
    sql = "SELECT nama_skema, ruang FROM skema WHERE no_skema = '"+ no_skema +"';"
    result = connect(sql, 'GET')
    return str(result)

@app.route("/create_nilai", methods=['POST'])
def create_nilai() :
    no_peserta = request.form['no_peserta']
    no_skema = request.form['no_skema']
    nilai_p = request.form['nilai_p']
    nilai_i = request.form['nilai_i']
    nilai_t = request.form['nilai_t']

    sql = "INSERT INTO hasil(no_peserta, no_skema, nilai_p, nilai_i, nilai_t, delete_status) VALUES('"+ no_peserta +"','"+ no_skema +"', '"+ nilai_p +"', '"+ nilai_i +"', '"+ nilai_t +"', '0') RETURNING id_hasil;"
    hasil = connect(sql, 'POST')

    return str(hasil)

@app.route("/update_nilai", methods=['PUT'])
def update_nilai() :
    id_hasil = request.form['id_hasil']
    nilai_p = request.form['nilai_p']
    nilai_i = request.form['nilai_i']
    nilai_t = request.form['nilai_t']

    sql = "UPDATE hasil SET  nilai_p = '"+ nilai_p +"', nilai_i = '"+ nilai_i +"', nilai_t = '"+ nilai_t +"', delete_status = '0' WHERE id_hasil = '"+ id_hasil +"' RETURNING id_hasil;"
    result = connect(sql, 'PUT')

    return str(result)

@app.route("/delete_nilai", methods=['PUT'])
def delete_nilai() :
    id_hasil = request.form['id_hasil']

    sql = "UPDATE hasil SET delete_status = 1 WHERE id_hasil = '"+ id_hasil +"' RETURNING id_hasil;"
    result = connect(sql, 'PUT')

    return str(result)

@app.route("/get_nilai", methods=['GET'])
def get_nilai() :
    sql = "SELECT * FROM hasil WHERE delete_status = 0;"
    result = connect(sql, 'GET')
    return str(result)

@app.route("/get_nilai_by_id", methods=['POST'])
def get_nilai_by_id() :
    id_hasil = request.form['id_hasil']
    sql = "SELECT no_peserta, no_skema, nilai_p, nilai_i, nilai_t FROM hasil WHERE id_hasil = '"+ id_hasil +"';"
    result = connect(sql, 'GET')
    return str(result)
 
if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='127.0.0.7', port=3000)