from fastapi import APIRouter, HTTPException
import sqlite3
import os
from pydantic import BaseModel
from typing import List

# ✅ Using APIRouter correctly
router = APIRouter()

class SubmittedForm(BaseModel):
    serial_number: str
    # staff_no: str
    submission_time: str
    

# ✅ Database path setup
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATABASE = os.path.join(BASE_DIR, "sqliteDB", "kemri.db")

# ✅ Debugging database existence
print(f"Checking database at: {DATABASE}")
if not os.path.exists(DATABASE):
    raise Exception(f"Database not found at {DATABASE}")

# ✅ Function to fetch submitted forms
def fetch_submitted_forms():
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT serial_number, submission_time FROM kemriinfluenza_submittedform")
        rows = cursor.fetchall()

        return [
            {
                "serial_number": row["serial_number"],
                "submission_time": row["submission_time"]
                # "date_of_data_collection": str(row["date_of_data_collection"])  # ✅ Ensure it's a string
            }
            for row in rows
        ]

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

    finally:
        conn.close()


# ✅ API Endpoint to get all submitted forms
@router.get("/", response_model=List[SubmittedForm])
def get_submitted_forms():
    return fetch_submitted_forms()

# ✅ Health check endpoint to verify API status
@router.get("/health-check")
def health_check():
    return {"status": "running"}
