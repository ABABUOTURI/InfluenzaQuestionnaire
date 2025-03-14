import sqlite3
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

# ✅ Use APIRouter for modular structure
router = APIRouter()

# ✅ Database path setup
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATABASE = os.path.join(BASE_DIR, "sqliteDB", "kemri.db")

# ✅ Debugging database existence
print(f"Checking database at: {DATABASE}")
if not os.path.exists(DATABASE):
    raise Exception(f"Database not found at {DATABASE}")

# ✅ Define User Model
class User(BaseModel):
    id: int
    staff_no: str
    email: str

# ✅ Function to Fetch Users
def get_users():
    if not os.path.exists(DATABASE):
        raise HTTPException(status_code=500, detail="Database not found")

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, staff_no, email FROM kemriinfluenza_user")
        users = [{"id": row[0], "staff_no": row[1], "email": row[2]} for row in cursor.fetchall()]
        conn.close()
        return users
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# ✅ API Route for fetching users
@router.get("/", response_model=List[User])
def fetch_users():
    return get_users()
