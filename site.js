document.addEventListener("DOMContentLoaded", () => {
  const ENDPOINT = "https://formspree.io/f/xbgdpgdz";
  const form = document.getElementById("formulario");
  const passos = [...form.querySelectorAll(".passo")];
  const total = passos.length;
  const barra = form.querySelector(".barra span");
  const contador = form.querySelector(".contador");
  const aviso = form.querySelector(".aviso");
  const voltar = document.getElementById("voltar");
  const continuar = document.getElementById("continuar");
  const enviar = document.getElementById("enviar");
  let atual = 0;

  function mostrarAviso(texto, tipo = "") {
    aviso.textContent = texto;
    aviso.className = "aviso " + tipo;
  }

  function mostrar(indice) {
    atual = indice;
    passos.forEach((passo, i) => passo.classList.toggle("ativo", i === atual));
    barra.style.width = ((atual + 1) / total) * 100 + "%";
    contador.textContent = atual + 1 + " / " + total;
    voltar.hidden = atual === 0;
    continuar.hidden = atual === total - 1;
    enviar.hidden = atual !== total - 1;
    mostrarAviso("");
    const campo = passos[atual].querySelector("input:not([type=radio]), textarea, input[type=radio]");
    if (campo) campo.focus();
  }

  function validar() {
    const passo = passos[atual];
    if (!passo.hasAttribute("data-obrigatorio")) return "";

    if (passo.querySelector("input[type=radio]")) {
      return passo.querySelector("input:checked") ? "" : "Escolha uma opção para continuar.";
    }

    const campo = passo.querySelector("input");
    const valor = campo.value.trim();
    if (!valor) return "Esse campo é obrigatório.";
    if (campo.type === "tel" && valor.replace(/\D/g, "").length < 10) {
      return "Digite o número com DDD.";
    }
    return "";
  }

  function avancar() {
    const erro = validar();
    if (erro) return mostrarAviso(erro, "erro");
    if (atual < total - 1) mostrar(atual + 1);
  }

  continuar.addEventListener("click", avancar);

  voltar.addEventListener("click", () => {
    if (atual > 0) mostrar(atual - 1);
  });

  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT" && atual < total - 1) {
      e.preventDefault();
      avancar();
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const erro = validar();
    if (erro) return mostrarAviso(erro, "erro");

    enviar.disabled = true;
    voltar.disabled = true;
    mostrarAviso("Enviando...");

    try {
      const resposta = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!resposta.ok) throw new Error("Falha no envio");

      form.reset();
      mostrar(0);
      mostrarAviso("Pedido enviado! Em breve chamamos você no WhatsApp.", "sucesso");
    } catch {
      mostrarAviso("Não foi possível enviar agora. Tente de novo.", "erro");
    } finally {
      enviar.disabled = false;
      voltar.disabled = false;
    }
  });

  mostrar(0);
});