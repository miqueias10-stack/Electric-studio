document.addEventListener("DOMContentLoaded", () => {
  const ENDPOINT = "https://formspree.io/f/xbgdpgdz";
  const form = document.querySelector("#contato form");
  const botao = form.querySelector("button");
  const aviso = form.querySelector(".form-status");

  function mostrarAviso(texto, tipo) {
    aviso.textContent = texto;
    aviso.className = "form-status " + tipo;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    botao.disabled = true;
    mostrarAviso("Enviando sua mensagem...", "");

    try {
      const resposta = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!resposta.ok) throw new Error("Falha no envio");

      form.reset();
      mostrarAviso("Mensagem enviada! Em breve entramos em contato.", "sucesso");
    } catch {
      mostrarAviso("Não foi possível enviar agora. Tente de novo em instantes.", "erro");
    } finally {
      botao.disabled = false;
    }
  });

  const secoes = document.querySelectorAll("section");
  secoes.forEach((secao) => secao.classList.add("reveal"));

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  secoes.forEach((secao) => observador.observe(secao));
});