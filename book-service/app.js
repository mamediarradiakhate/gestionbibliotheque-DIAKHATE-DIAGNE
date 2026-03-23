const express = require("express");
const cors = require("cors");

const app = express();

const bookRoutes = require("./routes/bookRoutes");

const PORT = 2600;

app.use(express.json());
app.use(cors());

app.use(bookRoutes);
app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Service is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
