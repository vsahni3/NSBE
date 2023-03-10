import sqlite3
from pprint import pprint
from datetime import datetime
import geocoder


def give_date():
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M")
    return dt_string


def give_location() -> list:
    g = geocoder.ip('me')
    return [43.6629, -79.3987]


def create_map_table():
    """Initialize map table"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"CREATE TABLE IF NOT EXISTS map (id INTEGER PRIMARY KEY AUTOINCREMENT, lat nvarchar(100), long nvarchar(100), description LONGTEXT, date nvarchar(100))"
    mycursor.execute(command)
    conn.commit()


def create_user_table(email):
    """Initialize table for individual user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"CREATE TABLE IF NOT EXISTS {email}user (id INTEGER PRIMARY KEY AUTOINCREMENT, transcript LONGTEXT, analysis LONGTEXT, classification nvarchar(100), date nvarchar(100))"
    mycursor.execute(command)
    conn.commit()


def insert_map(description: str):
    """Insert new message into messages"""
    date = give_date()
    lat, long = give_location()
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()
    mycursor.execute(f"INSERT INTO map (lat, long, description, date) VALUES (?, ?, ?, ?)", (lat, long, description, date))
    conn.commit()


def insert_user(email: str, transcript: str, analysis: str, classification: str):
    """Insert new message into messages"""
    date = give_date()
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()
    mycursor.execute(f"INSERT INTO {email}user (transcript, analysis, classification, date) VALUES (?, ?, ?, ?)", (transcript, analysis, classification, date))
    conn.commit()


def load_map():
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"""SELECT id, lat, long, description, date FROM map"""
    mycursor.execute(command)

    return mycursor.fetchall()


def remove_message(email: str, transcript: str):
    """Remove message from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM {email}user WHERE transcript = '{transcript}'"
    mycursor.execute(command)
    conn.commit()

def load_messages(email: str):
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"""SELECT transcript, analysis, classification, date FROM {email}user"""
    mycursor.execute(command)

    return mycursor.fetchall()


def remove_all_user(email: str):
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()
    mycursor.execute(f'DELETE FROM {email}user')
    conn.commit()

def remove_all_map():
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()
    mycursor.execute(f'DELETE FROM map')
    conn.commit()


# create_map_table()
# conn = sqlite3.connect("mydatabase.db")
# mycursor = conn.cursor()
# description = 'I was shoved by a cop'
# date = "04/03/2023 23:57"
# lat = '43.9'
# long = '-79.3'
# mycursor.execute(f"INSERT INTO map (lat, long, description, date) VALUES (?, ?, ?, ?)", (lat, long, description, date))

# description = 'An officer pushed me to the ground'
# date = "04/02/2023 21:51"
# lat = '43.8'
# long = '-79.2'
# mycursor.execute(f"INSERT INTO map (lat, long, description, date) VALUES (?, ?, ?, ?)", (lat, long, description, date))

# description = 'I was called racial slurs'
# date = "04/01/2023 13:27"
# lat = '44'
# long = '-79.4'
# mycursor.execute(f"INSERT INTO map (lat, long, description, date) VALUES (?, ?, ?, ?)", (lat, long, description, date))
# conn.commit()



