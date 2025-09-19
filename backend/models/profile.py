from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal
from datetime import datetime

class PersonalInfo(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    location: str = Field(..., min_length=1, max_length=100)
    bio: Optional[str] = Field(None, max_length=1000)
    avatar: Optional[str] = None
    headline: Optional[str] = Field(None, max_length=200)

class CareerInfo(BaseModel):
    current_role: str = Field(..., min_length=1, max_length=100, alias="currentRole")
    experience: str = Field(..., min_length=1, max_length=50)
    industry: str = Field(..., min_length=1, max_length=100)
    expected_salary: str = Field(..., min_length=1, max_length=50, alias="expectedSalary")
    preferred_location: str = Field(..., min_length=1, max_length=200, alias="preferredLocation")

class Skill(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    level: int = Field(..., ge=0, le=100)
    category: Literal['technical', 'soft']

class Education(BaseModel):
    degree: str = Field(..., min_length=1, max_length=100)
    institution: str = Field(..., min_length=1, max_length=200)
    year: str = Field(..., min_length=4, max_length=4)
    grade: str = Field(..., min_length=1, max_length=20)

class Achievement(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    date: str = Field(..., min_length=4, max_length=10)

class CareerGoals(BaseModel):
    short_term: str = Field(..., min_length=1, max_length=1000, alias="shortTerm")
    long_term: str = Field(..., min_length=1, max_length=1000, alias="longTerm")
    interests: List[str] = Field(default_factory=list)

class UserProfile(BaseModel):
    personal_info: PersonalInfo = Field(..., alias="personalInfo")
    career_info: CareerInfo = Field(..., alias="careerInfo")
    skills: List[Skill] = Field(default_factory=list)
    education: List[Education] = Field(default_factory=list)
    achievements: List[Achievement] = Field(default_factory=list)
    career_goals: CareerGoals = Field(..., alias="careerGoals")

class ProfileResponse(BaseModel):
    user_id: str
    profile: UserProfile
    created_at: datetime
    updated_at: datetime

class UpdateProfileRequest(BaseModel):
    profile: UserProfile