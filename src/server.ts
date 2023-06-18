import { server } from "./app";
import dotenv from "dotenv";
dotenv.config();

let port = process.env.PORT || 8080;

const testserver = server.listen(port, () => {
  console.log("App listen on port 8080");
});

export {server, testserver}
