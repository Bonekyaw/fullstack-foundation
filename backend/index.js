import http from "http";
import capitalize from "capitalize";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(capitalize.words("hello world"));
    res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body>");
    res.write("<h1>Hello Node Users </h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(8080);
