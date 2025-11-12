// optional: use OpenAI to analyze free-text notes and return a short analysis
const axios = require('axios');

module.exports = async function analyzeText(note) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const prompt = `You are a concise mood analyzer. Given the user's note, output a JSON with fields: "summary" (1 sentence), "likelyMood" (one of: very_happy,happy,neutral,sad,very_sad), "advice" (one short practical suggestion). Note: be short and practical. Note: user note: """${note}"""`;

  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model,
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    max_tokens: 200,
    temperature: 0.6
  }, {
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    }
  });

  // attempt to pull plain text (depends on model response format)
  const text = resp.data?.choices?.[0]?.message?.content;
  // return text raw — caller can parse or store
  return text || null;
};
