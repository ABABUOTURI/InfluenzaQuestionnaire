from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kemriinfluenza.fastapi_app import router as fastapp_router  # ✅ Corrected import
from kemriinfluenza.submitted_forms_api import router as submitted_forms_router  # ✅ Corrected import

app = FastAPI()

# ✅ Add CORS middleware for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers from both modules
app.include_router(fastapp_router, prefix="/api/staff", tags=["staff"])
app.include_router(submitted_forms_router, prefix="/api/submitted-forms", tags=["submitted_forms"])

@app.get("/")
def root():
    return {"message": "FastAPI combined server is running"}

# ✅ Run FastAPI with Uvicorn (if executed directly)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("kemriinfluenza.main:app", host="0.0.0.0", port=8001, reload=True)
