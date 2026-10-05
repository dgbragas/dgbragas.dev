---
title: 'a11y - Parte 4: Acessibilidade no Código'
description: 'E aí, tudo tranquilo contigo? Se você caiu aqui de paraquedas, esta postagem faz parte de uma série autoral sobre Acessibilidade. Caso tenha interesse, dê uma olhada nas postagens anteriores:'
intro: "E aí, tudo tranquilo contigo? Se você caiu aqui de paraquedas, esta postagem faz parte de uma série autoral sobre Acessibilidade. Caso tenha interesse, dê uma olhada nas postagens anteriores:\n\n- Parte 1: [Introdução à Acessibilidade](/blog/a11y-parte-1-introducao-a-acessibilidade);\n- Parte 2: [Desmistificando a Acessibilidade Digital](/blog/a11y-parte-2-desmistificando-a-acessibilidade-digital);\n- Parte 3: [Acessibilidade no Design](/blog/a11y-parte-3-acessibilidade-no-design)."
section: 'Acessibilidade (a11y)'
tags:
  - 'Acessibilidade'
  - 'Code'
readTime: 18
cover:
  src: './cover.png'
  alt: 'a11y - Parte 4: Acessibilidade no Código'
  caption: 'Banner em tom azulado mostrando a conexão entre as ilustrações de "Audição", "Habilidade Motora" e "Visão" , todas ligadas ao tema central: Acessibilidade Digital — os 0,1% que representam 100% dos usuários.'
publishedAt: '2025-04-21'
updatedAt: '2025-04-22'
related:
  - 'a11y-parte-3-acessibilidade-no-design'
lang: 'pt-BR'
draft: false
---

Relembre o momento em que você criou o seu primeiro website. Provavelmente, sua maior preocupação era apenas colocar aquele conteúdo no ar — sem pensar muito em usabilidade, performance ou, principalmente, **acessibilidade**.

O problema é que essa mentalidade de priorizar apenas o funcionamento básico ainda persiste em muitos produtos digitais — inclusive de grandes empresas. O tempo passa, as tecnologias evoluem, mas o cuidado com acessibilidade muitas vezes continua ausente.

> "Pense na acessibilidade do seu site como alguém que está em uma emergência. Essa pessoa conseguiria realizar todas as ações sem obstáculos?"

Mesmo que nem sempre receba a atenção que merece, a acessibilidade web pode (e deve) ser um **diferencial competitivo**. Por isso, reuni aqui algumas boas práticas essenciais para considerar na construção — ou refatoração — das suas aplicações, com foco em **HTML**, **CSS** e **JavaScript** acessível.

## Construindo um HTML Acessível

A semântica do HTML é o alicerce de qualquer site acessível. Ele é o primeiro ponto de contato com o usuário — especialmente com quem depende de leitores de tela ou tem deficiência visual.

Essas pessoas não verão as belezas do seu CSS, nem as animações vislumbrantes do seu JS. Elas dependem exclusivamente da estrutura do HTML para compreender o conteúdo e navegar pela sua aplicação.

> "A semântica do HTML não demora mais para escrever do que a versão não-semântica (ruim) se você escrevê-la consistentemente desde o começo do projeto. Existem também outros benefícios de utilizá-la". — *_*(Developers Mozilla)*_

Construir um HTML acessível não é apenas sobre "usar tags bonitas" ou "colocar essa tag aqui porque deve ajudar". Estruturar uma boa árvore de elementos é uma forma de comunicar, de forma semântica e clara, o conteúdo da sua aplicação — como se fosse uma história contada em capítulos bem definidos: títulos, links, contextos e navegação.

Então, o que faz um HTML ser realmente acessível — e como evitamos armadilhas comuns no dia a dia?

### Se você precisa de um botão, utilize um botão.

As tecnologias assistivas não saberão que sua `div` é um `button`, assim como vai interpretar seu `a` como um redirecionamento para um local — e não como uma ação. Ou seja, você cria um cenário extremamente confuso para quem não está tendo contato visual com o seu site.

```html
<!-- DO -->
<button>Meu botão</button>

<!-- DON'T -->
<div>Meu botão</div>
<a onclick="">Meu botão</a>
```

### Insira a propriedade 'lang' em seu HTML

Além de ser extremamente valioso para SEO, definir a linguagem do seu documento ajuda ferramentas de tradução, auxilia tecnologias assistivas a escolher o perfil de voz correto, entre outros benefícios — tudo isso com uma configuração simples.

```html
<html lang="pt-br">
  <!-- Conteúdo -->
</html>
```

### Use os headings com moderação e consciência

Ao estruturar corretamente os conteúdos da sua aplicação com os _headings_ adequados (`<h1>` - `<h6>`) você ajuda os usuários a entender a hierarquia da página e a relação entre seções. Tecnologias assistivas permitem navegação **saltando de título em título** — mas isso só funciona se sua hierarquia for coerente.

```html
<!-- DO -->
<h1>Título principal da página</h1>
<h2>Subtítulos</h2>
<h3>Títulos adicionais</h3>

<!-- DON'T -->
<h1>Título principal</h1>
<h1>Subtítulo</h1>
<h1>Título adicional</h1>
```

### Cuidado com os descritivos em seus atributos alt

Diferente do que muitos pensam, o atributo `alt` não serve só para "caso a imagem não carregue". Ele **descreve a imagem para leitores de tela**, ajudando usuários a entenderem o que está sendo exibido. Então sim, ele vai ler aquele "meu texto louco" que você colocou ali 👀

```html
<!-- DO -->
<img
  alt='Representação sobre uma pessoa acessando o nosso aplicativo na tela de "Login"'
  src="path/to"
/>

<!-- DON'T -->
<img alt="Imagem maneira" src="path/to" />
```

#### Às vezes é melhor apenas adicionar um alt em branco

Imagens meramente decorativas devem ter `alt=""`. Isso informa às tecnologias assistivas que essa imagem pode ser ignorada durante a leitura.

```html
<img src="cool_image.png" alt="" />
```

**PS.:** Não omitir o atributo. Omitir significa que a imagem tem valor semântico, mas que o texto alternativo não está disponível — e isso será lido pelo leitor de tela.

### Utilize o autocomplete nos campos de input

Adicionar o atributo de `autocomplete` permite que navegadores ofereçam preenchimento automático de campos. Isso melhora a usabilidade e reduz o esforço cognitivo e físico.

```html
<input id="email" type="email" autocomplete="email" />
```

### Sempre adicione labels aos seus inputs

Os `labels` tornam os formulários mais acessíveis. Eles:

- Ajudam leitores de tela a identificar o propósito do campo;
- Aumentam a área clicável (clicar no texto foca o input);
- Permitem navegação por voz mais intuitiva;
- Melhoram a semântica geral do formulário;
- Evitam alertas em ferramentas de validação como `@storybook/addon-a11y`.

E lembre-se: **placeholders não substituem labels**. Eles não são confiáveis para leitores de tela e desaparecem quando o usuário começa a digitar.

```html
<form>
  <label for="name">Seu nome</label>
  <input id="name" type="text" placeholder="Digite o seu nome..." />
</form>
```

#### Separe elementos do formulário com fieldset + legend

Além dos `labels`, usar `fieldset` com `legend` ajuda a agrupar campos logicamente e a oferecer contexto adicional — útil especialmente para grupos de _radio buttons_, _checkboxes_ ou blocos temáticos.

```html
<!-- DO -->
<form>
  <fieldset>
    <legend>Há quantos anos você trabalha na área?</legend>

    <input type="radio" id="1to2" name="years" />
    <label for="1to2">1 a 2 anos</label>

    <input type="radio" id="3to4" name="years" />
    <label for="3to4">3 a 4 anos</label>

    <input type="radio" id="5more" name="years" />
    <label for="5more">5 ou mais anos</label>
  </fieldset>
</form>

<!-- DON'T -->
<form>
  Há quantos anos você trabalha na área?
  <input type="radio" id="1to2" name="years" />
  <label for="5-more">1 a 2 anos</label>
  <input type="radio" id="3to4" name="years" />
  <label for="5-more">3 a 4 anos</label>
  <input type="radio" id="5more" name="years" />
  <label for="5-more">5 ou mais anos</label>
</form>
```

### Utilize tags semânticas sempre que possível

Com o HTML5, temos tags como `<article>`, `<section>`, `<aside>` e `<nav>` para substituir usos genéricos de `<div>`. Isso melhora a semântica e facilita a navegação por tecnologias assistivas.

```html
<body>
  <header>
    <!-- Navegação principal -->
  </header>

  <section>
    <!-- Seções gerais da página -->
  </section>

  <article>
    <!-- Conteúdos de artigo -->
  </article>

  <aside>
    <!-- Conteúdo adicional, nas laterais da página -->
  </aside>

  ...
</body>
```

#### Adicione ARIA Landmarks em suas estruturas

Landmarks (`role="banner"`, `role="main"`, etc.) ajudam tecnologias assistivas a reconhecer áreas da página e pular direto para elas — melhorando a navegação.

```html
<!-- Cabeçalho principal da página -->
<header role="banner"></header>

<!-- Áreas com links para navegação na página ou site -->
<nav role="navigation"></nav>

<!-- Identifica o conteúdo principal da página -->
<main role="main" id="main-content"></main>

<!-- Marca um conteúdo complementar ao conteúdo principal -->
<aside role="complementary"></aside>

<!-- Define o local do rodapé com informações gerais/legais da página -->
<footer role="contentinfo"></footer>

<!-- Usado para áreas de busca -->
<form role="search" action="/buscar" method="get"></form>

<!-- Descreve formulários com entrada de dados -->
<form role="form" action="/enviar" method="post"></form>

<!-- Marca uma área que possui um significado independente na página -->
<section role="region" aria-labelledby="unique-title">
  <h2 id="unique-title">Seção de destaque</h2>
  <p>Conteúdo da seção apartada.</p>
</section>
```

### Faça testes com navegação no teclado

A ordem do DOM é a ordem de leitura para tecnologias assistivas. Isso significa que a forma como você estrutura os elementos afeta diretamente a experiência. Teste navegando com a tecla `Tab` — veja se os `:focus` seguem uma ordem lógica e se é possível **usar o site sem mouse**.

![Meme 'Disaster Girl', reproduzido por IA no estilo de animações do Studio Ghibli, onde uma menina olha para a câmera enquanto uma casa queima ao fundo](./a11y-parte-4-ordem-de-focus.png)

## Construindo um CSS Acessível

Estruturar um bom CSS vai muito além de "deixar a página bonita". Folhas de estilo acessíveis pensam em clareza visual, legibilidade e percepção de conteúdo **para todos os usuários** — inclusive aqueles com baixa visão, daltonismo ou que dependem de leitores de tela em conjunto com o conteúdo visual.

É sobre equilibrar estética com responsabilidade, buscando sempre garantir que a experiência seja consistente independentemente da forma de navegação.

> "A beleza de uma interface é ampliada quando todos conseguem interagir com ela."

Mas como garantir que nossa interface seja funcional, mesmo quando os estilos não são vistos da forma que esperamos?

### Dê foco ao que é importante

A navegação por teclado é um dos **pilares da acessibilidade** — e ela não é limitada apenas a usuários leitores de tela. Pessoas com deficiências motoras, temporárias ou permanentes, também dependem do teclado para acessar conteúdos.

Exibir o **estado de foco** de maneira visível é essencial para guiar todos esses usuários.

#### Diferenças entre usuários de teclado e mouse

Uma das grandes frustrações no desenvolvimento de interfaces é lidar com a diferença entre focos ativados por teclado ou por mouse. E, embora seja comum ver designers solicitando a remoção dos `outline`, **desabilitar totalmente o foco visual não é uma opção**.

Para resolver isso, podemos usar o seletor `:focus-visible`, que ativa o foco **apenas em interações feitas pelo teclado**.

```css
/* Estilização para focos em geral */
button:focus {
  background: yellow;
}

/* Estilização ao receber foco via teclado (Tab) */
button:focus-visible {
  background: blue;
}
```

#### Estilizando elementos com elementos filho focados

Uma prática interessante em formulários ou componentes complexos é utilizar `:focus-within`. Ao utilizá-lo, conseguimos aplicar uma **estilização ao elemento pai** quando **qualquer filho interno** receber foco.

```css
form:focus-within {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.24);
}
```

Essa técnica auxilia a percepção do usuário durante a navegação, dando um maior contexto visual — principalmente aos que estão navegando via teclado.

### Cuidado ao utilizar reset.css em suas estruturas

O famoso `reset.css` é útil para padronizar estilos iniciais, mas precisa ser usado com bastante cautela pois, dentre outras coisas, ele:

- Remove sublinhados de links (`<a>`);
- Remove o `outline` de elementos focáveis;
- Anula estilos importantes para acessibilidade.

Por conta disso, ao invés de resets agressivos, prefira ajustes controlados:

```css
/* [🌍] Reset CSS Global - Modern Standards */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}

html {
  font-size: 100%;
}

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;
}

img,
picture,
video,
canvas,
svg {
  max-width: 100%;
  height: auto;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}

/* 
 * Permite que você recrie a estilização do `button` de maneira 
 * manual — e sem interferências do HTML base
 */
button {
  all: unset;
}

a {
  color: inherit;
}
```

### Não utilize pseudoelementos para renderizar textos

Pseudoelementos (`::before` e `::after`) são ótimos para reforçar o design, mas não para exibir conteúdos textuais. Isso pois conteúdos inseridos através de `content` geralmente **não são lidos por leitores de tela** e podem causar confusão durante a navegação.

```css
/* DO */
.class::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
}

/* DON'T */
.class::after {
  content: 'Conteúdo da div';
  position: absolute;
  left: 0;
  top: 0;
}
```

Mantenha os textos importantes sempre no HTML real.

### Utilize 'ch' para limitar a quantidade de caracteres

Precisa limitar a largura baseada em número de caracteres? Use a unidade `ch`:

```css
.class {
  max-width: 80ch;
}
```

Essa medida torna mais fácil coordenar o tamanho do container, auxiliando no conciliar com blocos grandes de texto ou layouts com necessidades específicas.

### Oculte elementos com responsabilidade

Ocultar elementos visualmente — e sem removê-los da leitura por tecnologias assistivas — exige técnicas específicas.

#### Ocultando elementos apenas visualmente

Use classes como `.sr-only` para esconder visualmente um elemento sem impedir que leitores de tela o leiam:

```css
/* Nome definido como uma classe global "apenas para screen readers" */
.sr-only {
  /* Altera o posicionamento padrão */
  position: absolute;

  /* Reseta qualquer propriedade que possa alterar o tamanho do elemento */
  border: 0;
  padding: 0;

  /* Define qual parte do elemento deve ser exibida */
  clip: rect(0 0 0 0);
  clip-path: inset(50%);

  /* Recomendação geral de uso */
  margin: -1px;

  /* Oculta o overflow de conteúdo após alteração no seu tamanho */
  overflow: hidden;

  /* Mantém, para que não seja ignorado, o elemento com o menor tamanho possível */
  height: 1px;
  width: 1px;

  /* Workaround para alguns textos */
  white-space: nowrap;
}
```

Essa prática é extremamente importante para coordenar textos que auxiliem contexto e navegação aos usuários.

#### Ocultando elementos para todos

Agora, caso a intenção seja **remover completamente o elemento** (visual e assistivamente), use `aria-hidden="true"`, `display: none` ou `visibility: hidden`.

```css
[aria-hidden='true'] {
  display: none;
}
```

#### Crie uma ação de 'skip-to-content'

O "skip-to-content" é um recurso que permite os usuários saltarem menus e chegarem direto ao conteúdo principal da página.

```css
.skip-to-content {
  position: absolute;
  left: 8px;
  top: 8px;
}

.skip-to-content:not(:focus) {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
  height: 1px;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  width: 1px;
}
```

**Dica:** se você já criou a `.sr-only`, pode reaproveitar essa classe em `.skip-to-content:not(:focus)` para simplificar!

### Busque suporte entre navegadores

Novos recursos CSS são incríveis, mas é importante garantir suporte cruzado para todos os usuários. Exemplo:

```css
/* Fallback para não prejudicar a experiência do usuário */
.class {
  background: rgba(255, 255, 255, 0.8);
}

/* background-filter */
.class {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```

Use ferramentas como o [Can I Use](https://caniuse.com/) para verificar a compatibilidade dos recursos que você escolher.

### Adapte sua página para impressão, se fizer sentido

Se a sua página contém informações relevantes para impressões (relatórios, insights, dashboards), ofereça uma boa experiência também no papel.

```css
@media print {
  body {
    margin: 2cm; /* Recomendação para impressão */
  }

  a::after {
    content: ' (' attr(href) ')'; /* Exibe os links completos */
  }
}
```

## Construindo um JavaScript Acessível

Ah, o JavaScript... o lugar onde a mágica acontece.

Trabalhar com essa tecnologia na web é dar vida às aplicações através de uma experiência com animações, dinâmicas de elemento, controles de estados e interações avançadas. Entretanto, é também nesse local onde existe a responsabilidade de garantir que todos possam participar da experiência na aplicação sem que existam barreiras invisíveis.

Mas, como podemos criar experiências dinâmicas **sem fechar as portas para quem navega de outras formas**?

### Cuidado com as bibliotecas que você instala em seu projeto

Seja trabalhando com frameworks ou em Vanilla, bibliotecas sempre auxiliam os trabalhos de desenvolvimento. Entretanto, muitas delas não focam em questões de acessibilidade e, consequentemente, o seu projeto começa a ficar com vários problemas acessíveis.

Pensando nisso, é extremamente importante assegurar boas bibliotecas que têm acessibilidade em mente ao escolhê-las para seus projetos. Alguns exemplos de boas bibliotecas para componentes que trabalham com este foco são:

- [a11y-tabs](https://github.com/AgnosticUI/a11y-tabs): Biblioteca simples para criar tabs acessíveis em qualquer framework.
- [embla-carousel](https://www.embla-carousel.com/): Crie um carousel completamente acessível, com recursos de rolagem por teclado e leitura de slides.
- [downshift](https://www.downshift-js.com/): Criado para autocomplete, dropdowns e selects superacessíveis. Flexível e altamente customizável.
- [radix-ui](https://www.radix-ui.com/): Fornece componentes "sem estilo", mas 100% acessíveis e prontos para customizar.
- [react-modal](https://www.npmjs.com/package/react-modal): Componente de modal superacessíveis para React, já lidando com foco, ESC, etc.

### Conteúdos dinâmicos precisam ser informados aos leitores de tela

Em aplicações modernas — especialmente SPAs —, mudanças na interface muitas vezes acontecem sem que a página recarregue. Mas, esse comportamento, para usuários que dependem de leitores de tela, pode passar despercebido caso não sejam corretamente anunciados.

> Leitores de tela normalmente detectam conteúdos apenas quando o foco muda ou quando o próprio usuário solicita. Mudanças dinâmicas precisam ser sinalizadas manualmente.

E é exatamente para esses momentos que existem as **ARIA Live Regions**: atributos que permitem as mudanças de conteúdo serem lidas automaticamente, melhorando a compreensão do que está acontecendo na tela.

#### Entendendo 'role' e 'aria-live'

Lidando com os ARIA temos a possibilidade de usar alguns atributos como o `role` e o `aria-live`, que conseguem ofertar melhor contexto do que está acontecendo aos usuários.

O atributo `role` define o **tipo de informação** que aquele elemento representa para o leitor de tela e pode ter os seguintes valores:

- **Landmark Roles** — áreas principais da página
  - `banner`: Cabeçalho principal da página.
  - `contentinfo`: Rodapé da página.
  - `complementary`: Conteúdo complementar (ex.: barra lateral).
  - `form`: Agrupamento de campos do formulário.
  - `navigation`: Menu de navegação.
  - `main`: Conteúdo principal da página.
  - `region`: Uma seção importante da página que precisa ser anunciada
  - `search`: Áreas de busca.
- **Widget Roles** — componentes interativos
  - `button`: Botão clicável.
  - `checkbox`: Caixa de seleção.
  - `dialog`: Caixa de diálogo/modal.
  - `link`: Link que leva para outro lugar.
  - `menu`: Menu de opções.
  - `menuitem`: Item de menu.
  - `slider`: Controle deslizante (range input).
  - `switch`: Botão de alternância (tipo toggle).
  - `tab`: Aba de navegação.
  - `tabpanel`: Conteúdo associado a uma aba.
  - `tooltip`: Dica de ferramenta/descrição.
- **Live Region Roles** — atualizações automáticas
  - `alert`: Mensagem urgente, interrompe a leitura.
  - `log`: Atualizações sequenciais (ex.: chat, feed).
  - `marquee`: Conteúdo que se move automaticamente.
  - `status`: Mensagens de status que aguardam a fala atual.
  - `timer`: Contador regressivo ou cronômetro.
- **Document Structure Roles** — estrutura geral
  - `cell`: Célula de uma tabela.
  - `heading`: Cabeçalho/título (`<h1>` - `<h6>`).
  - `list`: Lista de itens.
  - `listitem`: Item de uma lista.
  - `row`: Linha de uma tabela.
  - `table`: Tabela de dados.

Por sua vez, o `aria-live` informa ao leitor de tela que o conteúdo dentro daquele elemento **pode mudar dinamicamente** — e que ele deve ser anunciado. Para isso, ele possui os seguintes valores:

- `off` (padrão): Não anuncia mudanças.
- `polite`: Aguarda o leitor terminar a leitura atual e então anuncia.
- `assertive`: Interrompe imediatamente qualquer leitura em andamento para anunciar a nova informação.

Além disso, vale lembrar que muitos elementos HTML já tem um `role` nativo (por exemplo, o `<button>` já é `role="button"`), então você **não precisa adicionar o role manualmente** esse atributo para todos os elementos — apenas use-o quando realmente precisar mudar o significado ou criar algo customizado.

#### Exemplo prático: exibindo uma mensagem de sucesso

Suponha que um formulário é salvo sem recarregar a página. Visualmente você exibe um `<Alert>`, mas usuários de leitor de tela precisam ser notificados também.

Uma solução simples seria um `status` ou `alert` para notificar o usuário que algo sofreu alteração, tal como:

```html
<div class="alert" role="status">Alterações salvas!</div>
```

Nesse caso, a mensagem será **lida de forma gentil**, após o leitor terminar o que estava falando — e ainda notificar o usuário que algo foi alterado.

#### Boas práticas ao usar Live Regions

Como vimos, há diversos valores que podemos usar conforme estruturamos nosso conteúdo — e de como o JavaScript apresenta essas informações de forma mais fluída para quem navega.

Para complementar, podemos levar em conta algumas boas práticas para facilitar o pensamento durante a construção:

- Não mova o foco junto com as atualizações — apenas permita que o leitor de tela anuncie.
- Prefira `status` para mensagens **rotineiras** ou **positivas**.
- Use `alert` apenas para **situações urgentes**.
- Evite alertas que desaparecem rápido demais, pois o leitor pode não ter tempo de anunciar.
- Atualize o conteúdo via JavaScript (por exemplo, alterando o `textContent`) para forçar o anúncio correto

### Não desabilite o zoom da página

Usuários que possuem problemas de visão costumam utilizar ferramentas como o zoom da página para conseguirem ler as informações que estão sendo apresentadas na tela. Desabilitar essa função pode limitar o uso deles na sua aplicação e, consequentemente, perder possíveis novos usuários.

### Evite tornar elementos 'não-focáveis' em estruturas 'focáveis'

Elementos que, por padrão, não recebem ações de focos precisam manter este comportamento. A estrutura padrão da DOM HTML já traz elementos que são e não focáveis, tornar, por exemplo, uma `<div>` com efeito de botão focável ou um `<span>` que possui comportamentos de foco "inovadores" não são boas práticas. Opte por **utilizar os elementos correspondentes**.

### Modais precisam de comportamento pré-determinados

Ao desenvolver modais eles precisam receber alguns comportamentos essenciais como: possibilidade de fechar ao clicar `Esc`, controle de visibilidade para quando não está sendo exibido, entre outros.

```js
const modal = document.getElementById('modal');
const backdrop = document.getElementById('modal-backdrop');

// Fecha o modal ao apertar ESC
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});

// Fecha o modal ao clicar no backdrop
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    modal.style.display = 'none';
  }
});
```

Além disso, ao serem exibidos, por padrão, a ordem de foco ficará mantida nos elementos ao fundo da página — e essa não é a experiência ideal. Em vez disso, precisamos adicionar um foco a esse elemento e, ao fechar o popup, **retornar a ordem de foco para o último elemento focado**.

```js
const modal = document.getElementById('modal');
const backdrop = document.getElementById('modal-backdrop');

const openModal = document.querySelector('.open-btn');

let lastFocusedElement = null;

openModal.addEventListener('click', () => {
  lastFocusedElement = document.activeElement;
  modal.style.display = 'block';
  modal.focus();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
    lastFocusedElement.focus();
  }
});

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    modal.style.display = 'none';
    lastFocusedElement.focus();
  }
});
```

### Validando se a aplicação está acessível

Interfaces construídas de maneira mal planejada criam uma sensação de impotência nas pessoas, fazendo com que eles imaginem 'serem incapazes' de utilizar a solução. Para isso, algumas ferramentas podem ajudar a aperfeiçoar tais experiências.

Lembrando que as ferramentas auxiliam, mas a validação mais poderosa ainda é a empatia: navegar com outros olhos, de outras formas.

#### Validando componentes

Uma das ferramentas que permitem a realização de testes automatizados é o [Storybook](https://storybook.js.org/), que consegue verificar a acessibilidade dos componentes criados na aplicação

> "Você nunca vai conseguir uma experiência perfeita para todo o mundo, e isso não é um problema. Não precisa ser perfeito. Faça o seu melhor." — **_(pedrodias.net, Dicas de Acessibilidade)_**

Nessa estrutura, é possível adicionar o _addon_ de `@storybook/addon-a11y` e configurar para que ele monitore a acessibilidade do seu componente com base em algumas configurações do plugin, como o exemplo abaixo em React:

```js
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    a11y: {
      // Configurações opcionais de acessibilidade
      element: '#root', // Elemento raiz
      manual: false, // Teste automático (false) ou manual (true)
    },
  },
};

export const Primary = () => <Button>Click</Button>;
Primary.storyName = 'Primary Button';
```

---

Entretanto, estas são apenas algumas abordagens para garantir uma boa evolução no desenvolvimento acessível da solução. Ao fim, o importante é lembrar que a ideia não é "criar uma interface que seja 100% aderente a todos os critérios possíveis já mapeados", e sim estar **constantemente evoluindo a sua solução conforme as Métricas Acessíveis** — e é sobre isso que vamos explorar a seguir!

---

Algumas das referências utilizadas na construção desse artigo:

- [Writing HTML with accessibility in mind](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412#.h1zs8p7vh)
- [Writing CSS with accessibility in mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939#7013)
- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9#.2fsgfo6ih)
