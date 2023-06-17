import { server } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

let port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("App listen on port 8080");
});
