import asyncio
import discord
import os
from fastapi import FastAPI
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv() # Env variables for the bot
BOT_TOKEN = os.environ.get("BOT_TOKEN", "")
BOT_CLIENT_ID = os.environ.get("BOT_CLIENT_ID", "")
BOT_CLIENT_SECRET = os.environ.get("BOT_CLIENT_SECRET", "")

bot = commands.Bot(command_prefix=";turbo", intents=discord.Intents.all())
app = FastAPI(debug=True)

@bot.event
async def on_connect():
    print("Connected to Discord")


async def run():
    try:
        await bot.start(BOT_TOKEN)
    except KeyboardInterrupt:
        await bot.logout()


@app.get("/")
async def root():
    return {"message": "Hello World"}


asyncio.create_task(run())
