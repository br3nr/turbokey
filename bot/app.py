import asyncio
import discord
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from discord.ext import commands
from dotenv import load_dotenv
from src.session.session_manager import SessionManager
from src.routers.auth_router import AuthRouter

load_dotenv()  # Env variables for the bot
BOT_TOKEN = os.environ.get("BOT_TOKEN", "")
BOT_CLIENT_ID = os.environ.get("BOT_CLIENT_ID", "")
BOT_CLIENT_SECRET = os.environ.get("BOT_CLIENT_SECRET", "")
REDIRECT_URI = os.environ.get("REDIRECT_URI", "")
REDIRECT_LOC = os.environ.get("REDIRECT_LOC", "")

bot = commands.Bot(command_prefix=";turbo", intents=discord.Intents.all())
app = FastAPI(debug=True)

auth_router = AuthRouter(BOT_TOKEN, BOT_CLIENT_SECRET, REDIRECT_URI, REDIRECT_LOC)
app.include_router(auth_router, tags=["auth"])


@app.middleware("http")
async def authenticate_request(request, call_next):
    if request.url.path.startswith("/auth"):
        response = await call_next(request)
        return response

    token = request.cookies.get("session_id")
    session_manager = SessionManager.get_instance()

    if session_manager.is_authenticated(token):
        response = await call_next(request)
        print(session_manager.get_user(token))
        return response
    else:
        return JSONResponse(status_code=401, content={"message": "Unauthorized"})


@bot.event
async def on_connect():
    print("Connected to Discord")


@app.get("/")
async def root():
    return {"message": "Hello from root!"}


@app.get("/auth/")
async def auth():
    return {"message": "Hello from Auth!"}


@bot.tree.command()
async def turbo(ctx: discord.Interaction):
    await ctx.response.send_message("http://localhost:3000/")


async def run():
    try:
        await bot.start(BOT_TOKEN)
    except KeyboardInterrupt:
        await bot.logout()


asyncio.create_task(run())
