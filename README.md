# 🎬 Buscador de Filmes Pro

Um buscador de filmes dinâmico e interativo que consome dados da **OMDb API**. O projeto evoluiu de uma lista simples para uma aplicação completa com sistema de favoritos, detalhes técnicos e foco em experiência do usuário (UX).

## 🔗 Demonstração
Acesse o projeto online: https://adrianogirardi84.github.io/buscador-de-filmes/

## ✨ Funcionalidades
* **Busca em Tempo Real:** Pesquisa de filmes e séries utilizando integração com API REST.
* **Sistema de Detalhes (Modal):** Janela interativa que realiza uma segunda requisição para buscar sinopse, diretor e avaliações do IMDB.
* **Favoritos com Persistência:** Permite salvar e remover filmes favoritos utilizando o `localStorage` do navegador (os dados permanecem salvos mesmo após fechar a aba).
* **Feedback Visual (UX):** Loader de carregamento, efeitos de hover com zoom e layout responsivo.
* **Atalhos de Teclado:** Suporte para busca ao pressionar a tecla `Enter`.

## 🛠️ Tecnologias e Conceitos Aplicados
* **HTML5 & CSS3:** Layout estruturado com **CSS Grid** e **Flexbox**. Uso de `object-fit: cover` para padronização de posters.
* **JavaScript (ES6+):**
    * **Consumo de API:** Uso de `fetch` e `Async/Await` para operações assíncronas.
    * **Manipulação do DOM:** Criação dinâmica de elementos para renderização de cards e modais.
    * **Web Storage API:** Implementação de `localStorage` para persistência de dados no lado do cliente.
    * **Lógica de Arrays:** Uso de métodos como `filter`, `map` e `find` para gestão da lista de favoritos.
* **Git & GitHub:** Fluxo de trabalho profissional com controle de versão e commits semânticos.

## 📦 Como executar localmente
1. Clone este repositório:
   ```bash
   git clone [https://github.com/AdrianoGirardi84/buscador-de-filmes.git](https://github.com/AdrianoGirardi84/buscador-de-filmes.git)
