# n8n AI Proxy

Secure proxy built with Next.js to connect a public client to an n8n AI automation workflow without exposing the n8n API key.

## Features

- Secure API proxy
- Hidden API key using environment variables
- Connects to n8n Production Webhook
- Supports multiple AI agents
- Deployed on Vercel

## API Endpoint

```text
POST /api/ask
```

## Request Example

```json
{
  "name": "Aamer",
  "message": "ما هي عاصمة اليابان؟"
}
```

## Response Example

```json
{
  "status": "success",
  "agent": "information",
  "reply": "تُعد طوكيو عاصمة اليابان."
}
```