from typing import Union
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def read_index():
    return {"API Operante"}