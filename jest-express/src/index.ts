import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, () => console.log("Server is running at: " + PORT));
