import OpenAI from "openai";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const fileBuffer = Buffer.concat(buffers);

  const prompt = `Elegant watercolor fashion illustration,
full body portrait,
soft pastel tones,
delicate watercolor brush strokes,
minimal line art,
editorial fashion style,
white background,
accurate facial likeness,
natural skin tones,
high-end illustration,
clean and refined.`;

  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    image: fileBuffer,
    size: "1024x1024",
  });

  res.status(200).json({ image: result.data[0].url });
}
