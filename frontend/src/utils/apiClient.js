const apiClient = async (path, options = {}) => {
  const {
    method = "GET",
    body = null,
    requireAuth = false,
    headers = {},
  } = options;

  const fetchOpts = { method, headers: { ...headers } };

  // default content-type for JSON bodies
  if (body && !fetchOpts.headers["Content-Type"]) {
    fetchOpts.headers["Content-Type"] = "application/json";
  }

  if (body && fetchOpts.headers["Content-Type"] === "application/json") {
    fetchOpts.body = JSON.stringify(body);
  } else if (body) {
    fetchOpts.body = body;
  }

  // Attach auth token when requested or if an Authorization header isn't provided
  if (requireAuth && !fetchOpts.headers.Authorization) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token)
        fetchOpts.headers.Authorization = `Bearer ${user.token}`;
    } catch (e) {
      // ignore JSON parse errors; caller will handle missing auth
    }
  }

  const apiRoot = process.env.REACT_APP_API_BASE_URL || "";
  const res = await fetch(`${apiRoot}${path}`, fetchOpts);
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // non-JSON response
  }

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) ||
      `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};

export default apiClient;
