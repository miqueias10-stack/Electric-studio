import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL(".", import.meta.url));

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const servidor = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const pedido = decodeURIComponent(pathname) === "/" ? "/index.html" : decodeURIComponent(pathname);
  const caminho = join(raiz, normalize(pedido));

  if (!caminho.startsWith(raiz) || extname(caminho) === ".mjs" || pedido.includes("/.")) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Acesso negado");
  }

  try {
    const conteudo = await readFile(caminho);
    res.writeHead(200, {
      "Content-Type": tipos[extname(caminho).toLowerCase()] || "application/octet-stream",
    });
    res.end(conteudo);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Página não encontrada");
  }
});

const PORTA = process.env.PORT || 3000;

servidor.listen(PORTA, () => {
  console.log("Servidor rodando na porta " + PORTA);
});