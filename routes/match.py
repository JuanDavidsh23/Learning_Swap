from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import SessionLocal
from schemas.match import InteractionRequest
from services.match_service import create_interaction

router = APIRouter()

# ---------- DEPENDENCIA DB ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- SWIPES LIKES Y PASSES ----------
@router.post("/swipe")
def swipe_user(data: InteractionRequest, db: Session = Depends(get_db)):
    """
    Endpoint donde el Frontend enviará si dio Like o Pass a una tarjeta.
    El backend revisará si hay Match automáticamente.
    """
    return create_interaction(db, data)

@router.get("/feed/{user_id}", response_model=dict)
def get_feed(user_id: int, db: Session = Depends(get_db)):
    """
    Endpoint para que el Frontend obtenga las "Tarjetas" (Usuarios) 
    a los que el usuario actual aún NO les ha dado Like o Pass. 
    Idealmente para la pantalla principal (Home).
    """
    from services.match_service import get_user_feed
    return get_user_feed(db, current_user_id=user_id)
