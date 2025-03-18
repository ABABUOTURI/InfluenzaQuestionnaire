from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

DJANGO_BACKEND_URL = "http://127.0.0.1:8000/api/relationship-distribution/"
@router.get("/relationship-distribution/")
def fetch_relationship_distribution():
    try:
        response = requests.get(DJANGO_BACKEND_URL)
        response.raise_for_status()  # Raise error for non-200 status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
