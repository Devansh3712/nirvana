from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel

from config import env


class LLMRequest(BaseModel):
    message: str


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("prompt.txt") as infile:
    assistant_prompt = infile.read()

with open("insights.txt") as infile:
    insights_prompt = infile.read()

client = Groq(api_key=env.GROQ_API_KEY)
messages = [{"role": "system", "content": assistant_prompt}]


@app.post("/chat")
async def chatbot(body: LLMRequest):
    messages.append({"role": "user", "content": body.message})
    response = client.chat.completions.create(
        messages=messages,
        model="llama-3.1-70b-versatile",
        temperature=0.5,
    )
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return {"response": reply}


@app.post("/entry-insights")
async def journal_entry_insights(body: LLMRequest):
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": insights_prompt},
            {"role": "user", "content": body.message},
        ],
        model="llama-3.1-70b-versatile",
        temperature=0.5,
    )
    return response.choices[0].message.content
