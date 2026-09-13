(() => {
  "use strict";

  const CONFIG = {
    clientUrl:
      "https://raw.githubusercontent.com/googleaccount962/myfirstrepo/main/third.html",
  };

  function fail(message) {
    document.body.innerHTML = `<pre style="margin:0;padding:24px;color:#fff;background:#000;font:16px system-ui;white-space:pre-wrap">${message}</pre>`;
  }

  function setLoading(text) {
    const loading = document.getElementById("loading");
    if (loading) loading.textContent = text;
  }

  async function start() {
    const clientUrl =
      document.documentElement.dataset.clientUrl ||
      document.querySelector('meta[name="eagler-client-url"]')?.content ||
      CONFIG.clientUrl;

    if (!clientUrl) {
      fail("No client URL is configured.");
      return;
    }

    try {
      setLoading("Downloading…");

      const res = await fetch(clientUrl, {
        method: "GET",
        credentials: "omit",
        cache: "force-cache",
      });

      if (!res.ok) {
        throw new Error("HTTP " + res.status + " while fetching client");
      }

      setLoading("Starting game…");

      const html = await res.text();

      if (!html || html.length < 1000) {
        throw new Error("Client payload is empty or too small");
      }

    } catch (err) {
      fail("Launch failed:\n" + ((err && err.message) || String(err)));
      console.error("[payload]", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
