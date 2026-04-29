import { app, PORT } from "./app.js";

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
