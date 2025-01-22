async function download(type) {
  const url = document.getElementById("url").value;
  const errorEl = document.getElementById("error");
  errorEl.textContent = "";

  if (!url) {
    errorEl.textContent = "Please enter a YouTube URL";
    return;
  }

  try {
    const response = await fetch(`/download/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    // Trigger file download
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${type === "video" ? "video" : "audio"}.${
      type === "video" ? "mp4" : "mp3"
    }`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (error) {
    errorEl.textContent = error.message;
  }
}
