const botoesTema = document.querySelectorAll(".botao-tema");
const temaSalvo = localStorage.getItem("tema");

function aplicarTema(temaEscuro) {
    document.body.classList.toggle("modo-escuro", temaEscuro);

    botoesTema.forEach(function (botao) {
        botao.textContent = temaEscuro ? "☀" : "☾";
        botao.setAttribute(
            "aria-label",
            temaEscuro ? "Ativar modo claro" : "Ativar modo escuro"
        );
        botao.setAttribute("aria-pressed", temaEscuro ? "true" : "false");
        botao.title = temaEscuro ? "Ativar modo claro" : "Ativar modo escuro";
    });
}

aplicarTema(temaSalvo === "escuro");

botoesTema.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const temaEscuro = !document.body.classList.contains("modo-escuro");
        aplicarTema(temaEscuro);
        localStorage.setItem("tema", temaEscuro ? "escuro" : "claro");
    });
});

const saudacao = document.querySelector("body:not(.pagina-blog):not(.pagina-contato) main > p:first-of-type");

if (saudacao) {
    const textoOriginal = saudacao.textContent.trim();
    saudacao.textContent = "";
    let letra = 0;

    function digitarTexto() {
        if (letra < textoOriginal.length) {
            saudacao.textContent += textoOriginal.charAt(letra);
            letra++;
            setTimeout(digitarTexto, 75);
        }
    }

    digitarTexto();
}

const elementosAnimados = document.querySelectorAll(
    ".sobremim, .habilidades, section.projetos, .blog, " +
    ".info, .tecnologia, .soft-skill, .artigo, " +
    ".blog-card, .blog-categorias, .ctpg-bloco-formulario, " +
    ".ctpg-bloco-contatos, .ctpg-disponibilidade"
);

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    elementosAnimados.forEach(function (elemento) {
        elemento.classList.add("animar");
        observador.observe(elemento);
    });
}

const botaoProjetos = document.querySelector("button.projetos");
if (botaoProjetos) {
    botaoProjetos.addEventListener("click", function () {
        const secaoProjetos = document.querySelector("#projetos");
        if (secaoProjetos) {
            secaoProjetos.scrollIntoView({ behavior: "smooth" });
        }
    });
}

const botaoCurriculo = document.querySelector("button.currículo");
if (botaoCurriculo) {
    botaoCurriculo.addEventListener("click", function () {
        const linkDownload = document.createElement("a");
        linkDownload.href = "curriculo-sophia.pdf";
        linkDownload.download = "Curriculo-Sophia-Mendes-de-Mello.pdf";
        document.body.appendChild(linkDownload);
        linkDownload.click();
        linkDownload.remove();
    });
}

const campoTelefone = document.querySelector("#ctpg-telefone");
if (campoTelefone) {
    campoTelefone.addEventListener("input", function () {
        let numero = campoTelefone.value.replace(/\D/g, "").substring(0, 11);

        if (numero.length > 10) {
            numero = numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        } else if (numero.length > 6) {
            numero = numero.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        } else if (numero.length > 2) {
            numero = numero.replace(/^(\d{2})(\d+)/, "($1) $2");
        } else if (numero.length > 0) {
            numero = "(" + numero;
        }

        campoTelefone.value = numero;
    });
}

const formularioContato = document.querySelector(".ctpg-formulario");

if (formularioContato) {
    formularioContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioContato.checkValidity()) {
            formularioContato.reportValidity();
            return;
        }

        const nome = document.querySelector("#ctpg-nome").value.trim();
        const email = document.querySelector("#ctpg-email").value.trim();
        const telefone = document.querySelector("#ctpg-telefone").value.trim();
        const assunto = document.querySelector("#ctpg-assunto").value.trim();
        const mensagem = document.querySelector("#ctpg-mensagem").value.trim();

        const corpo =
            "Nome: " + nome + "\n" +
            "E-mail: " + email + "\n" +
            "Telefone: " + telefone + "\n\n" +
            "Mensagem:\n" + mensagem;

        const destino = "sophiamellomendes@gmail.com";
        const linkEmail = "mailto:" + destino +
            "?subject=" + encodeURIComponent(assunto) +
            "&body=" + encodeURIComponent(corpo);

        window.location.href = linkEmail;
    });
}

const botoesFiltro = document.querySelectorAll(".blog-filtros button");
const artigosBlog = document.querySelectorAll(".blog-card");

function filtrarArtigos(categoria) {
    artigosBlog.forEach(function (artigo) {
        const categoriaArtigo = artigo.dataset.categoria;
        const mostrar = categoria === "Todas" ||
            categoria === "Dicas e Estudos" ||
            categoriaArtigo === categoria;

        artigo.hidden = !mostrar;
    });

    botoesFiltro.forEach(function (botao) {
        const ativo = botao.textContent.trim() === categoria;
        botao.classList.toggle("blog-filtro-ativo", ativo);
    });
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        filtrarArtigos(botao.textContent.trim());
    });
});

const categoriasDaUrl = {
    web: "Desenvolvimento Web",
    csharp: "C#",
    banco: "Banco de Dados",
    linux: "Linux",
    design: "Design",
    dicas: "Dicas e Estudos"
};

const categoriaInicial = new URLSearchParams(window.location.search).get("categoria");
if (categoriaInicial && categoriasDaUrl[categoriaInicial] && botoesFiltro.length) {
    filtrarArtigos(categoriasDaUrl[categoriaInicial]);
}

const cabecalho = document.querySelector(".cab");
const botaoMenu = document.querySelector(".botao-menu");

function alternarMenu(abrir) {
    cabecalho.classList.toggle("menu-aberto", abrir);
    botaoMenu.textContent = abrir ? "✕" : "☰";
    botaoMenu.setAttribute("aria-expanded", abrir ? "true" : "false");
    botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

if (cabecalho && botaoMenu) {
    botaoMenu.addEventListener("click", function () {
        alternarMenu(!cabecalho.classList.contains("menu-aberto"));
    });

    cabecalho.querySelectorAll("li a").forEach(function (link) {
        link.addEventListener("click", function () {
            alternarMenu(false);
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            alternarMenu(false);
        }
    });
}

const campoNome = document.querySelector("#ctpg-nome");
if (campoNome) {
    campoNome.addEventListener("input", function () {
        campoNome.value = campoNome.value.replace(/[^A-Za-zÀ-ÿ' -]/g, "").replace(/\s{2,}/g, " ");
    });
}

const campoEmail = document.querySelector("#ctpg-email");
if (campoEmail) {
    campoEmail.addEventListener("input", function () {
        campoEmail.value = campoEmail.value.replace(/\s/g, "").toLowerCase();
    });
}
