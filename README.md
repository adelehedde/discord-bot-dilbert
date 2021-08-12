# Discord-Bot-Dilbert
> Dilbert By Scott Adams

## Overview

Discord bot that sends you the last post from Dilbert's website.

![Discord Message Example](doc/discord-message-example.jpg)


### Implementation details

Simple NodeJS script parsing html from Dilbert's website.  
Data is sent with a Discord Webhook.

```
# Dilbert's Website
https://dilbert.com
```

## How to use

### Create a Webhook

You will need to set the following environment variable : `DISCORD_WEBHOOK_URL`

To get your webhook url, have a look to the discord documentation to know how to create one : [Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

### How to run

```
cd discord-bot-dilbert
npm install
DISCORD_WEBHOOK_URL=<discord_webhook_url> node src/index.js
```

### How to deploy

This is up to you !

You can simply schedule it with a cron job :
```
15 9 * * 1-5 DISCORD_WEBHOOK_URL=<discord_webhook_url> node discord-bot-dilbert/src/index.js > /var/log/discord-bot-dilbert/dilbert_$(date +\%Y\%m\%d_\%H:\%M:\%S\%z).log 2>&1
```

### Docker

```
# Build the docker image
docker build -t discord-bot-dilbert .
# Run the container
docker run --rm  -e DISCORD_WEBHOOK_URL=<discord_webhook_url> discord-bot-dilbert
# Run the container interactively
docker run -it --rm discord-bot-dilbert bash
```

Available on [Docker Hub](https://hub.docker.com/r/adelehedde/discord-bot-dilbert)
