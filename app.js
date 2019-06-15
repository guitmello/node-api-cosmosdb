const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

const port = process.env.PORT || "3000";
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
