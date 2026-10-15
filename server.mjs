// server.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const server = createServer(async (req, res) => {
  try {
    if (req.url === "/" || req.url === "/index.html") {
      const html = await readFile("./index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    }
    // Rota do Favicon com aviso no terminal
    else if (req.url === "/favicon.png" || req.url === "/favicon.ico") {
      console.log(
        "-> O navegador pediu o favicon.png. Tentando ler o arquivo...",
      );
      const img = await readFile("./favicon.png");
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(img, "binary");
    }
    // Rota do Banner com aviso no terminal
    else if (req.url === "/logo-banner.png") {
      console.log(
        "-> O navegador pediu o logo-banner.png. Tentando ler o arquivo...",
      );
      const img = await readFile("./logo-banner.png");
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(img, "binary");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Página não encontrada");
    }
  } catch (error) {
    console.error(
      "❌ ERRO: O Node não encontrou o arquivo na pasta! Detalhe:",
      error.message,
    );
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Erro interno: arquivo de imagem faltando.");
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor da Electric Studios rodando com sucesso!`);
});