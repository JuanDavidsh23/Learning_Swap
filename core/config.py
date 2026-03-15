"""
Modulo de configuracion.

Carga TODAS las variables de entorno desde el archivo .env y las expone
como constantes para su uso en toda la aplicacion.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Supabase (Storage de imágenes)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
