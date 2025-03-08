from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join("backend", "sqliteDB", "kemri.db")

def fetch_data(query, params=()):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            columns = [column[0] for column in cursor.description]
            results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return results
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# @app.get("/api/visitor_logs")
# def get_visitor_logs():
#     return fetch_data("SELECT ip, timestamp, userType FROM visitor_logs")

@app.get("/api/submitted_forms")
def get_submitted_forms():
    return fetch_data("SELECT staffNo, name, submissionTime, status FROM kemriinfuenza_respondent")

@app.get("/api/users")
def get_staff_list():
    return fetch_data("SELECT name, staffNo, email, role FROM auth_user")

# @app.get("/api/analytics")
# def get_analytics():
#     return fetch_data("SELECT date, submissions FROM analytics")
