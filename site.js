document.addEventListener("DOMContentLoaded", function () {
  // Adiciona smooth scrolling para links de navegação
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.offsetTop -
            document.querySelector("header").offsetHeight, // Ajusta para a altura do cabeçalho fixo
          behavior: "smooth",
        });
      }
    });
  });

  // Exemplo de uma funcionalidade mais avançada: Animação ao rolar
  // Você pode expandir isso para adicionar classes CSS que animam elementos
  // quando eles se tornam visíveis na tela.

  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.1, // Quando 10% da seção está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        // Adicione aqui classes para animar, por exemplo:
        // entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Para animar apenas uma vez
      }
    });
  }, options);

  sections.forEach((section) => {
    // Inicialmente, esconde e move os elementos para que a animação seja visível
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Você pode adicionar mais interatividade, como:
  // - Um formulário de contato funcional (requer um backend)
  // - Uma galeria de imagens para o portfólio
  // - Animações mais complexas com bibliotecas como GSAP
});
