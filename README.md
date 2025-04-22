<img width="1500" alt="github-thumb" src="https://github.com/user-attachments/assets/cb963624-12ed-430a-977c-c6ec2f481483" />

# `dgbragas.dev` - Blog, Portfólio e Institucional

> "Solucionando seus problemas através de tech e design."

`dgbragas.dev` é o meu site pessoal, que foi ganhando forma ao longo de vários anos e versões ([mais de seis até realmente ir ao ar](https://www.behance.net/gallery/222749765/UI-Engineer-Portfolio)). Nele, reúno parte dos projetos que vou desenvolvendo durante a minha trajetória, compartilho ideias no blog e, principalmente, uso como playground para testar stacks, bibliotecas, conceitos e estruturas diferentes - que podem também virar novos conteúdos.

## 🛠️ Tecnologias utilizadas

Durante o desenvolvimento do site, desde o design até o código, sempre tive uma preocupação especial com acessibilidade — tanto na arquitetura quanto na estrutura da DOM. Para isso, usei algumas bibliotecas e componentes baseados em boas práticas a11y, além de aplicar várias diretivas ARIA. O foco foi criar uma experiência mais inclusiva e funcional, sem abrir mão do visual — ainda estou trabalhando para deixar tudo 100% 👀.

- `aos`: Animações de entrada dos componentes de maneira fluída — _e com low bundle size 😅_;
- `astro`: Desenvolvimento de aplicações _content-driven_ de maneira simplificada e com ótima performance;
- `embla-carrousel`: Componente de `Carrousel` com boas práticas de a11y e fácil estilização;
- `marked`: Responsável por transformar os conteúdos de `markdown` recebidos pelo [Content Manager](https://github.com/dgbragas/content-manager) em HTML;
- `radix-ui`: Componentes complexos otimizados, headless e com foco total em acessibilidade;
- `@studio-freight/lenis`: Suavização dos scrolls da aplicação — sejam estes pelo mouse ou por âncoras da própria aplicação;
- `@whatt-if`: [Biblioteca de autoria própria](https://github.com/whatt-if) onde disponibilizo uma série de `utils`, `linters` etc.

## 📂 Estrutura de pastas

A estrutura do projeto segue um modelo que curto bastante e é bem comum na comunidade: uma separação organizada em contextos, facilitando a manutenção no longo prazo:

```
┌────────────────────────┐
│ @dgbragas/dgbragas.dev │
├────────────────────────┘
│
│── /
│   ├── .vscode
│   ├── public/
│   │   ├── files/
│   │   ├── fonts/
│   │   ├── scripts/
│   ├── eslint.config.js
│   ├── prettier.config.js
│   ├── src/
│   │   ├── api/
│   │   │   ├── icons/
│   │   │   ├── illustrations/
│   │   │   ├── images/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── lib/
│   │   │   ├── local/
│   │   ├── constants/
│   │   ├── helpers/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── styles/
│   │   ├── utils/
└── dist
    └── @astrojs/vercel
```

## 🗺️ Roadmap

> So... yeah, work I guess

Sobre o roadmap: basicamente, estou sempre aproveitando os momentos para ajustar uma coisa aqui e outra ali. Às vezes testando novas ideias, outras só lapidando o que já estava encaminhado.

Abaixo você consegue ver — e eu também, já que provavelmente ia esquecer de algum tópico sem essa listinha — os próximos passos, funções, melhorias e afins que serão entregues no projeto:

- [x] Estruturar apresentação de `code highlight` no portfólio - (✅ 22/04/2025)
- [ ] Construir lógica para redirecionamento por filtro sem ocorrência de reload - _SR issue_;
- [ ] Adição do "skip-to-content" em todas as páginas;
- [ ] Construção da página de `/portfolio/private` com listagem de conteúdos exclusivos;
- [ ] Estrutura de compartilhamento de posts nas redes sociais;
- [ ] Isolar toda a estrutura de `components/lib` dentro `@whatt-if/design-system`;
- [ ] Consumir funções de `/utils` através da lib `@whatt-if/utils`;
- [ ] Remover duplicidades de estilização através de `@mixins`;
- [ ] Testes unitários dos componentes e funções _(é... dessa vez acabou passando 😭)_;
- [ ] Melhorar a forma de consumo dos SVGs dentro das páginas - _waiting for better SVG API from Astro_;
- ...

---

### Contate-me

- [Instagram](https://instagram.com/dgbragas.dev);
- [LinkedIn](https://linkedin.com/in/dgbragas);
- E-mail: work@dgbragas.com;
