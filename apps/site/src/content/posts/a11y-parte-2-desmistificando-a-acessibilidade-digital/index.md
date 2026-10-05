---
title: 'a11y - Parte 2: Desmistificando a Acessibilidade Digital'
description: 'E aí, tudo tranquilo contigo? Se você caiu aqui de paraquedas, esta postagem faz parte de uma série autoral sobre Acessibilidade. Caso tenha interesse, dá uma olhada nas postagens anteriores:'
intro: "E aí, tudo tranquilo contigo? Se você caiu aqui de paraquedas, esta postagem faz parte de uma série autoral sobre Acessibilidade. Caso tenha interesse, dá uma olhada nas postagens anteriores:\n\n- Parte 1: [Introdução à Acessibilidade](https://dgbragas.dev/blog/a11y-parte-1-introducao-a-acessibilidade)"
section: 'Acessibilidade (a11y)'
tags:
  - 'Acessibilidade'
readTime: 8
cover:
  src: './cover.png'
  alt: 'a11y - Parte 2: Desmistificando a Acessibilidade'
  caption: 'Banner em tom azulado mostrando a conexão entre as ilustrações de "Audição", "Habilidade Motora" e "Visão" , todas ligadas ao tema central: Acessibilidade Digital — os 0,1% que representam 100% dos usuários.'
publishedAt: '2025-04-02'
updatedAt: '2025-04-21'
related:
  - 'a11y-parte-1-introducao-a-acessibilidade'
  - 'a11y-parte-3-acessibilidade-no-design'
lang: 'pt-BR'
draft: false
---

Acessibilidade Digital consiste na **possibilidade e condição de alcance, percepção, entendimento, interação, utilização, participação e construção em igualdade de oportunidades, com segurança e autonomia**. Na prática, a acessibilidade consiste, essencialmente, em propor soluções que incluam todas as pessoas, desde aquelas com problemas motores ou visuais até as com deficiências cognitivas ou condições relacionadas — sejam estas **permanentes** ou **temporárias**.

Mas como saber se nossas soluções estão realmente garantindo — mesmo que parcialmente — a acessibilidade digital? Em qual parte investir esforços para tornar as aplicações atuais acessíveis? É nesse momento que entram os **Critérios de Acessibilidade**.

## WCAG 2.1: Diretrizes de Acessibilidade para Conteúdo Web

A WCAG define padrões internacionais para a web — especialmente relacionados a _HTML_, _CSS_ e _SVG_ —, auxiliando na criação de produtos mais acessíveis. Além desses padrões, há também guias complementares, tais como:

- **WAI-ARIA (Iniciativa de Acessibilidade Web):** Uma especificação técnica publicada pelo World Wide Web Consortium (W3C) que descreve como melhorar a acessibilidade de páginas na internet por meio de:
  - Aumentar a acessibilidade dos controles interativos;
  - Estabelecer pontos de referência na estrutura da página;
  - Identificar regiões ativas na página de maneira dinâmica.
- **GAIA:** Um guia com 29 recomendações baseadas na WCAG 2.1, focado em design inclusivo para pessoas com autismo.
- **eMAG:** Modelo de Acessibilidade em Governo Eletrônico com 46 recomendações alinhadas à WCAG.
  - _**Nota:** Não se recomenda priorizar essas regras, pois, embora baseadas na WCAG, incluem alterações que nem sempre são adequadas._
- **Android / iOS:** Tanto Android quanto iOS oferecem documentações com boas práticas para desenvolvimento acessível.

### Princípios e critérios de Acessibilidade

Para garantir a acessibilidade na web, existem quatro princípios que orientam todas as diretrizes. Esses princípios são conhecidos como os **fundamentos necessários para que qualquer pessoa possa acessar um conteúdo web**, e consistem em tornar essa informação:

- **Perceptível:** As informações e os componentes da interface precisam ser apresentados aos usuários de forma que eles possam perceber os elementos, independentemente de suas condições. Nenhuma informação essencial pode ser invisível ao usuário.
  - Ex.: Textos alternativos para leitores de tela; legendas para facilitar a compreensão; contrastes adequados entre elementos, etc.
- **Operável:** Os componentes da interface e a navegação precisam ser totalmente operáveis para qualquer usuário.
  - Ex.: Navegação acessível por teclado; coesão na marcação de links; atalhos para navegação rápida por leitores de tela, etc.
- **Compreensível:** Os usuários precisam entender o conteúdo na tela e serem capazes de operá-lo de maneira clara e compreensível. A WCAG recomenda que todos os textos sejam estruturados de forma que uma pessoa alfabetizada até a 4ª série consiga compreender.
  - Ex.: Textos fáceis de entender; ajuda na correção de erros gerais; descrições auxiliares em imagens, etc.
- **Robusto:** O conteúdo precisa ser interpretado com clareza por diversas tecnologias, garantindo ao usuário a possibilidade de acessar todos os conteúdos conforme a progressão da interface. É necessário que o sistema seja acessível através de uma ampla variedade de _user agents_ (desktop, tablet, mobile, etc) e também por tecnologias assistivas.
  - Ex.: Especificações adequadas de HTML; suporte a diversas resoluções de dispositivos; compatibilidade com todos os sistemas operacionais, etc.

### Níveis de Acessibilidade

Baseando-se em cada um dos princípios de acessibilidade, surgem uma ou mais **diretrizes com níveis de conformidade**. Ou seja, de acordo com os critérios que escolhemos para atingir os princípios de acessibilidade, estaremos nos enquadrando em diferentes níveis de conformidade com várias regras que nos auxiliam a coordenar esse processo.

Existem três níveis de conformidade que podem ser atingidos, sendo eles:

- **A — 30 critérios _(precisa ter)_:** Atende os requisitos mínimos e mais críticos da interface.
  - Aqui estão agrupados os critérios para alcançar os princípios de acessibilidade: Perceptível, Operável, Compreensível e Robusto.
- **AA — 20 critérios adicionais _(deveria ter)_:** Um nível intermediário de conformidade, que inclui os critérios do Nível A e adiciona 20, totalizando 50 critérios.
  - Neste nível estão diretrizes como: Texto alternativo; Adaptabilidade; Conteúdo discernível, entre outros.
- **AAA — 30 critérios adicionais _(poderia ter)_:** Inclui os critérios dos níveis A e AA, totalizando 80 critérios, e é o nível mais sofisticado de conformidade, embora possa ter alta complexidade de aplicação.
  - Neste nível são apresentados os critérios de sucesso para satisfazer cada uma das diretrizes, representando a maior complexidade.

A partir desses critérios é possível iniciar o desenvolvimento — ou refatorar aplicações já existentes — de forma acessível. Lembre-se de que a categorização mínima exige que seu projeto atenda aos 30 critérios base de aplicabilidade acessível.

### Os tipos de deficiência

> "Todos vamos ter deficiências eventualmente — a menos que a gente morra antes." — **_(Gregg Vanderheiden)_**

A deficiência está presente em nosso cotidiano de forma constante. Todos nós, em algum momento, podemos nos encontrar deficientes de _n_ maneiras diferentes, que podem ser classificadas em três formas principais:

- **Permanentes:** Deficiências adquiridas após acidentes, presentes desde o nascimento ou causadas por outras condições.
  - Seu app suporta daltonismo?
  - Seu app funciona adequadamente sendo lido por leitores de tela?
- **Temporárias:** Condições transitórias, como luxações após exercícios, uso de tapa-olhos ou um braço quebrado/enfaixado.
  - Seu app pode ser facilmente utilizado em qualquer situação?
  - Seu app é pensado para usuários com mobilidades limitadas, sejam elas temporárias ou permanentes?
- **Situacionais:** Momentos em que o contexto limita as habilidades do usuário, como carregar uma criança no colo ou levar sacolas de compras até o estacionamento.
  - Seu app pode ser navegado sem problemas em dispositivos móveis?
  - É possível navegar no app apenas com uma das mãos?

A partir dessa análise, torna-se claro o motivo de a **acessibilidade ir além do público-alvo**. Os usuários mapeados como "alvos" de sua aplicação podem não ter deficiências permanentes, mas podem estar em situações onde enfrentam deficiências temporárias ou situacionais. Nesse caso, eles também estariam fora do seu público-alvo?

## A deficiência no Brasil

No Brasil, aproximadamente **18,6 milhões de pessoas com 2 anos ou mais possuem algum tipo de deficiência**, representando 8,9% da população nessa faixa etária. Além disso, dados estatísticos apontam que:

- **1 em cada 4** pessoas possuem deficiência;
- Existe um alto nível de pessoas com **deficiência severa**;
- O Brasil tem um número recorde de pessoas com **60 anos** ou mais.

Em contrapartida, dados do Movimento Web para Todos revelam que, após avaliação de **21 milhões de sites ativos**, apenas **0,46% dos sites brasileiros** são acessíveis. No caso dos sites governamentais, **99,79% apresentam falhas de acessibilidade**. No setor de e-commerce, **apenas 0,06% dos sites não apresentam falhas**.

Esses dados mostram o quão distante ainda estamos de uma web verdadeiramente acessível que promova acesso à informação para todos.

### Lei Brasileira de Inclusão (LBI)

A Lei Brasileira de Inclusão (LBI) — nº 13.146, de 6 de julho de 2015, Artigo 63 — determina que **todas as páginas web mantidas por empresas com sede ou representação comercial no Brasil sejam acessíveis**, seguindo as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente, como a WCAG.

Entretanto, devido à fiscalização pouco clara e vaga, **menos de 1%** dos sites brasileiros seguem os requisitos de acessibilidade. Além disso, há escassez de profissionais e iniciativas para fiscalizar a conformidade com essas diretrizes.

### GAIA: Guia de Acessibilidade de Interfaces para Autismo

> "O GAIA é um conjunto de recomendações para ajudar desenvolvedores de softwares e educadores digitais a entender melhor como desenvolver websites mais adequados às necessidades de crianças autistas com foco no uso de dispositivos multitoque." — **_(Descrição, gaia.wiki)_**

O GAIA é um guia de 29 recomendações, baseadas na WCAG 2.1, sobre **design inclusivo para pessoas com autismo**. Entre essas recomendações, podemos destacar algumas orientações importantes, tais como:

1. As cores da interface não podem ser a única forma de transmitir conteúdo. É necessário haver uma diferenciação clara entre os objetos de primeiro e segundo plano, bem como a relação entre os itens exibidos na tela;
2. Utilize uma linguagem visual e textual simples, evitando erros gramaticais, metáforas, jargões e outros elementos que possam dificultar a compreensão;
3. Procure ser sucinto ao transmitir informações, fazendo uso de parágrafos curtos;
4. Ícones, imagens e nomenclaturas devem ser compatíveis com o mundo real, evitando o uso de informações abstratas;
5. Permita que atividades envolvendo leitura e concentração tenham um modo leitura;
6. Projete interfaces simples, com conteúdos que priorizam apenas o necessário — evitando distrações que não façam sentido ao contexto;
7. Use e abuse de espaços em branco na interface, pois eles auxiliam na concentração em informações importantes;
8. Evite utilizar elementos que distraiam ou interfiram no foco e na atenção dos usuários.

Para mais informações, você pode consultar a [wiki oficial do GAIA](https://gaia.wiki.br/), que traz, de maneira detalhada e organizada, informações completas sobre todas as recomendações.

---

> "Como designers e desenvolvedores, precisamos lutar pela acessibilidade em nossas aplicações, pois somos nós que estamos na linha de frente da evolução dessas questões." — **_(Talita Pagani, Especialista em Acessibilidade Web)_**

Mas e agora, como realmente deixar as interfaces de sua aplicação acessível? No que focar em design? E no código, o que fazer? Tudo isso vou contando nas próximas partes dessa Jornada Acessível 🥰
