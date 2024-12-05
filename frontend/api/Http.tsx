import { ApiCall } from "../types";

const callApi = async (apiCall: ApiCall) => {
  const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3999" : "";

  try {
    const result = await fetch(`${baseUrl}/sqs`, {
      method: apiCall.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: apiCall.queue
        ? JSON.stringify({
            action: apiCall.action,
            queue: apiCall.queue,
            message: apiCall.message ? apiCall.message : "",
          })
        : null,
    });

    const body = await result.json();

    if (!result.ok) {
      apiCall.onError(body?.message ?? '');
    }

    apiCall.onSuccess(body);
  } catch (e) {
    if (e instanceof Error) {
      apiCall.onError(e.message);
    }
  }
};

export { callApi };
