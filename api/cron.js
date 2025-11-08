const generateRequest = await fetch(`${req.headers.origin}/api/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt })
});

const result = await generateRequest.json();
console.log("✅ Image generated:", result.image);
