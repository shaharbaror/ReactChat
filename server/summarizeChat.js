// // server/summarizeChat.js
// const express = require("express");
// const router = express.Router();
// const { Configuration, OpenAIApi } = require("openai");

// // Initialize OpenAI API
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Endpoint to summarize chat messages
// router.post("/summarizeChat", async (req, res) => {
//   const { messages } = req.body;

//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Summarize the following chat messages:\n${messages.join("\n")}`,
//       max_tokens: 150,
//     });
//     console.log(response.data.choices[0].text.trim());
//     res.json({ summary: response.data.choices[0].text.trim() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to summarize chat messages" });
//   }
// });

// module.exports = router;
