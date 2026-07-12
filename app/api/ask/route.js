export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        status: "failed",
        error_code: "INVALID_JSON",
        error: "request body must contain valid JSON",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const payload =
      body && typeof body === "object" && !Array.isArray(body) ? body : {};

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY,
      },
      body: JSON.stringify({
        name: payload.name ?? "Aamer",
        message: payload.message ?? "",
      }),
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      {
        status: "failed",
        error_code: "PROXY_ERROR",
        error: "proxy request failed",
      },
      {
        status: 500,
      }
    );
  }
}