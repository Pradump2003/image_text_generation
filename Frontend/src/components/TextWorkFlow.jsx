import { useState } from "react";
import axios from "axios";
import { OpenAI } from "openai";
import FormData from "form-data";
import LoaderOverlay from "./LoaderOverlay";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: import.meta.env.VITE_HF_TOKEN,
  dangerouslyAllowBrowser: true,
});
function TextWorkflow() {
  const [input, setInput] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Enhance Prompt
  const enhancePrompt = async () => {
    setLoading(true);
    try {
      const chatCompletion = await client.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3.1-Terminus:novita",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });
      setEnhanced(chatCompletion.choices[0].message.content);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const payload = {
        prompt: enhanced,
        output_format: "jpeg",
      };

      const response = await axios.postForm(
        `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
        axios.toFormData(payload, new FormData()),
        {
          validateStatus: undefined,
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STABILITY_KEY}`,
            Accept: "image/*",
          },
        }
      );
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoaderOverlay />}

      <h2>Text → Image Workflow</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={enhancePrompt}>Enhance Prompt</button>

      {enhanced && (
        <div>
          <p>
            <strong>Enhanced Prompt:</strong> {enhanced}
          </p>
          <button onClick={handleGenerate}>Generate Image</button>
        </div>
      )}

      {imageSrc && <img src={imageSrc} alt="Generated" />}
    </div>
  );
}

export default TextWorkflow;
