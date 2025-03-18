# uvicorn kemriinfluenza.main:app --host 0.0.0.0 --port 8001 --reload


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kemriinfluenza.fastapi_app import router as fastapp_router  # ✅ Corrected import
from kemriinfluenza.submitted_forms_api import router as submitted_forms_router  # ✅ Corrected import
from kemriinfluenza.age_distribution import router as age_distribution_router 
from kemriinfluenza.education_distribution import router as education_distribution_router 
from kemriinfluenza.religion_distribution import router as religion_distribution_router 
from kemriinfluenza.family_distribution import router as family_distribution_router 
from kemriinfluenza.financial_distribution import router as financial_distribution_router 
from kemriinfluenza.visitor_distribution import router as visitor_distribution_router 
from kemriinfluenza.educator_distribution import router as educator_distribution_router
from kemriinfluenza.topic_distribution import router as topic_distribution_router

from kemriinfluenza.relationship_distribution import router as relationship_distribution_router
from kemriinfluenza.occupation_distribution import router as occupation_distribution_router
from kemriinfluenza.siblings_distribution import router as siblings_distribution_router
from kemriinfluenza.partners_distribution import router as partners_distribution_router
from kemriinfluenza.pocketmoney_distribution import router as pocketmoney_distribution_router
from kemriinfluenza.moneyadequate_distribution import router as moneyadequate_distribution_router
from kemriinfluenza.guardianvisits_distribution import router as guardianvisits_distribution_router
from kemriinfluenza.access_distribution import router as access_distribution_router
from kemriinfluenza.info_distribution import router as info_distribution_router




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
app.include_router(age_distribution_router, prefix="/api/age-distribution", tags=["age_distribution"])
app.include_router(education_distribution_router, prefix="/api/education-distribution", tags=["education_distribution"])
app.include_router(religion_distribution_router, prefix="/api/religion-distribution", tags=["religion_distribution"])
app.include_router(family_distribution_router, prefix="/api/family-distribution", tags=["family_distribution"])
app.include_router(financial_distribution_router, prefix="/api/financial-distribution", tags=["financial_distribution"])
app.include_router(visitor_distribution_router, prefix="/api/visitor-distribution", tags=["visitor_distribution"])
app.include_router(educator_distribution_router, prefix="/api/educator-distribution", tags=["educator_distribution"])
app.include_router(topic_distribution_router, prefix="/api/topic-distribution", tags=["topic_distribution"])

app.include_router(relationship_distribution_router, prefix="/api/relationship-distribution", tags=["relationship_distribution"])
app.include_router(occupation_distribution_router, prefix="/api/occupation-distribution", tags=["ocupation_distribution"])
app.include_router(siblings_distribution_router, prefix="/api/siblings-distribution", tags=["siblings_distribution"])
app.include_router(partners_distribution_router, prefix="/api/partners-distribution", tags=["partners_distribution"])
app.include_router(pocketmoney_distribution_router, prefix="/api/pocketmoney-distribution", tags=["pocketmoney_distribution"])
app.include_router(moneyadequate_distribution_router, prefix="/api/moneyadequate-distribution", tags=["moneyadequate_distribution"])
app.include_router(guardianvisits_distribution_router, prefix="/api/guardianvisits-distribution", tags=["guardianvisits_distribution"])
app.include_router(access_distribution_router, prefix="/api/access-distribution", tags=["access_distribution"])
app.include_router(info_distribution_router, prefix="/api/info-distribution", tags=["info_distribution"])



@app.get("/")
def root():
    return {"message": "FastAPI combined server is running"}

# ✅ Run FastAPI with Uvicorn (if executed directly)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("kemriinfluenza.main:app", host="0.0.0.0", port=8001, reload=True)
