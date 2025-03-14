from fastapi.routing import APIRoute
from backend.kemriinfluenza.fastapi_app import app

print("Registered routes:")
for route in app.routes:
    if isinstance(route, APIRoute):
        print(f"Path: {route.path}, Methods: {route.methods}")
