const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/fluxus/bypass", async (req, res) => {
  const { link } = req.query;
  if (!link) {
    return res.status(400).json({ warning: "Url Needed, Samrat API" });
  }
  const StartTime = Date.now();
  try {
    let result;
    if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
      try {
        const FluxusAuthResponse = await axios.get(
          `https://fluxus-bypass-orcin.vercel.app/api/fluxus?link=${encodeURIComponent(link)}`
        );
        if (FluxusAuthResponse.data.key) {
          result = FluxusAuthResponse.data.key;
          console.log("Success:", result);
        } else {
          return res.status(500).json({
            error: "Failed to bypass url",
          });
        }
      } catch (error) {
        console.error("Failed to bypass url", error.message);
        return res.status(500).json({
          error: "Error fetching url",
        });
      }
    } else {
      return res.status(400).json({
        Note: "Url not supported to bypass Only Fluxus  like this https://flux.li/android/external/start.php?HWID=",
        Message: "SAMRAT API",
      });
    }

    const EndTime = Date.now();
    const duration = ((EndTime - StartTime) / 1000).toFixed(2);
    res.json({
      key: result,
      duration: `${duration}s`,
      credit: "Made by Samrat API",
    });
  } catch (error) {
    console.error("Error:", error.message);
    const EndTime = Date.now();
    const duration = ((EndTime - StartTime) / 1000).toFixed(2);
    res.status(500).json({
      Error: "Failed to bypass",
      Details: error.message,
      Duration: `${duration}s`,
      Message: "Made by Samrat API",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
