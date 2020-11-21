const state = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://goals-api.danielmoessner.de",
};

export const api = {
  namespaced: true,
  state,
};
