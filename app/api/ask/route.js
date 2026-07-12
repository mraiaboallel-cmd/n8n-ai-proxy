export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY,
      },
      body: JSON.stringify({
        name: body.name || "Aamer",
        message: body.message || "",
      }),
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
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