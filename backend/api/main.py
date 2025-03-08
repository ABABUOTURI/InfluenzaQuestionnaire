from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()

# Allow CORS for frontend requests (Modify to specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domains if security is a concern
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Correct path to database
DB_PATH = os.path.join("backend", "sqliteDB", "kemri.db")

# Function to fetch data from the database with error handling
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

# Endpoint to fetch visitor logs
@app.get("/api/visitor_logs")
def get_visitor_logs():
    query = "SELECT ip, timestamp, userType FROM visitor_logs"
    return fetch_data(query)

# Endpoint to fetch submitted forms
@app.get("/api/submitted_forms")
def get_submitted_forms():
    query = "SELECT staffNo, name, submissionTime, status FROM kemriinfuenza_respondent"
    return fetch_data(query)

# Endpoint to fetch staff list
@app.get("/api/submit")
def get_staff_list():
    query = "SELECT name, staffNo, email, role FROM auth_user"
    return fetch_data(query)

# Endpoint to fetch analytics data
@app.get("/api/analytics")
def get_analytics():
    query = "SELECT date, submissions FROM analytics"
    return fetch_data(query)
