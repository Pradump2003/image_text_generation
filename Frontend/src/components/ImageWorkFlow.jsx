import { useState } from "react";
import axios from "axios";
import { OpenAI } from "openai";
import LoaderOverlay from "./LoaderOverlay";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: import.meta.env.VITE_HF_TOKEN,
  dangerouslyAllowBrowser: true,
});

function ImageWorkflow() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [variations, setVariations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateText = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    const uploadRes = await axios.post(
      "https://image-text-generation-two.vercel.app/api/upload",
      formData
    );

    const imageUrl = uploadRes.data.data.secure_url;
    // Remove the data URL prefix
    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen3-VL-235B-A22B-Thinking:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in one sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });
    setDescription(chatCompletion.choices[0].message.content);
    setLoading(false);
  };

  const generateVariations = async () => {
    setLoading(true);
    try {
      const payload = {
        prompt: description,
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
      setVariations(url);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoaderOverlay />}

      <h2>Image → Variations Workflow</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleGenerateText}>Analyze</button>

      {description && (
        <div>
          <p>
            <strong>Image Description:</strong> {description}
          </p>
          <button onClick={generateVariations}>Generate Variations</button>
        </div>
      )}

      {variations && (
        <img src={variations} height={500} width={500} alt="Generated" />
      )}
    </div>
  );
}

export default ImageWorkflow;
