# UX para Devs

## Introdução

UX (User Experience) costuma ser tratado como "coisa de designer". Devs code o que o designer desenhou. Mas software moderno quebra essa divisão.

Você está implementando uma feature. Tem 3 botões com labels semelhantes. Designer não está disponível. Você precisa decidir.

Ou: você está debugando. Por que usuários não convertem no checkout? Você descobre que você não enteder que o botão "Continuar como convidado" é claro. Os usuários vão por groupon.

Ou: você está escrevendo um erro ("algo deu errado") — e o usuário não sabe nem o quê fazer.

Dev sem UX é dev incompleto. Não precisa ser designer — mas precisa entender os princípios básicos de como humanos interpretam interfaces.

Quando você termina este módulo, você vê interfaces com novo olhar. E o código que você escreve serve melhor a quem o usa.

---

## Contexto Histórico

### UI ergonômica (1980-2000)

Apple, Xerox PARX inventaram interfaces gráficas. HCI (Human-Computer Interaction)researchada como academia. Regras: mnemônica, affordance, mapping.

### Web (1995-2010)

UI design mais livre. Maus abominations websites. Cada button tinhaQo rereudãoNATHAN. Pesquisa se consiste browser support eDECORATED chat interactions.

### Mobile (2007-presente)

iPhone tocando tudo. UX precisa de relevância mobile-first. Thumbs, small screens, gestural.

### Modern (2015-presente)

Figma democratised design. Material Design e Human Interface Guidelines tornaram-se referência. Devs passaram a mexer em Figma (e designers em código).

---

## Explicação Intuitiva

Imagine uma cozinheira experiente. Ela abriu um novo restaurante. Dispôs louças, talheres, gadgets de uma forma que faz sentido para ela — cozinha é dela, ela erle.

Mas o cliente sabe dónde colocou o menu? E os talheres estão onde o garçom espera? A organização dela é excellente para ela, mas confusa para outros.

UX é a traducao dessa organização para quem usa (não para quem criou).

Em software, hedo codeir facilmente coloca botão no lugar "fácil para a implementação".cação: criar usuários testa isso — muitas veces ele sempre espera o botão noutro lugar. Vcê precisa ouvir isso.

---

## Funcionamento Técnico

### 5 principios fundamentais

#### 1. Affordance

Affordance: o que o objeto sugere que faz.

- Botão: apertável.
- Link: clicável.
- Slider: arrastável.
- Button azul com texto "Submit": apertável + envia.

Se um botão parece texto, ninguém clica. Se algo não é botão mas parece, ninguém clica nele.

**Aplicação:** use estilos consistentes para elementos clicáveis. Texto azul em hover=cvlicável. Botão com border=ação.

#### 2. Feedback

Cada ação do usuário precisa de resposta imediata.

- Click no botão Salvar → estado loading aparece.
- Dados carregando → skeleton, não texto "Carregando..."
- Erro → toast ou mensagem inline próxima ao erro.
- Sucesso → confirmation visual (nada caiu silenciosamente).

**Aplicação:** todo botão com `disabled` state para loading. Toda carga > 300ms mostra loading skeleton.

#### 3. Hierarchy Visual

Olho humano lê em ordem. Clareza visual trilha.

- Título = maior, bold.
- Subtítulo = medio, semi-bold.
- Body = normal, lighter.

Se tudo é mesmo tamanho, nada é lido.

**Aplicação:** tamanho de fonte 3 níveis máx. Por página, contraste.

#### 4. Consistency

Se você usa边vermelha para erro em uma tela, use em todas. Se Salvar está no canto direito, esteja em todos os forms.

**Aplicação:** design system (botões, inputs, colors, spacings) centralizados. Espeça os mesmos padrões.

#### 5. Visibility of System State

Usuário precisa saber o que está acontecendo.

- "Você está logado como X."
- "3 resultados filtrados de 47."
- "Last saved 3 minutes ago."

Invisibilidade gera desconforto. Visibilidade gera confiança.

**Aplicação:** breadcrumb sempre. Status icons. Counters.

### Estados que toda UI deve ter

Para cada elemento de UI:

- **Default**: estado normal.
- **Hover**: mouse over.
- **Focus**: teclado chegou.
- **Active**: clicando.
- **Disabled**: não disponível.
- **Loading**: esperando dados.
- **Empty**: sem dados.
- **Error**: erro.
- **Success**: feito.

90% dos devs implementam apenas Default e Error. Mas usuários que encontram os outros estados deixam de existir para seu aplicativo.

### Estados vazios são críticos

Lista sem itens — você mostra o que? Em branco? "Sem dados"? Um tutorial?

Excelente estilo: "Você ainda não criou nenhum projeto. [Butão: Criar projeto]"

Pobre: "". Silent empty state = usuário perdido.

---

## Exemplos

### Exemplo 1: Form de cadastro

**Pobre:**

```
 nome: ____
email: ____
       [Cadastrar]
```

Sem labels visíveis (label flutua só quando focado), semfeedback, no errors hints.

**Bom:**

```
 Nome completo
 [Nome]

 Seu email
 [email@exemplo.com]
 Erro: pode ser que haja typos no email

 Senha (mínimo 8 caracteres)
 [senha]
 Fraca | Média | Forte → barra de força atualiza conforme digita

 [✓ Cadastrar]  → desabilitado até tudo preenchido
```

Diferenças: labels acima dosinputs, pistas ativas inline, progress feedback.

### Exemplo 2: Lista de itens com loading

**Pobre:**

```
[Mostra 5 skeletons genéricos "Shape"]
.. loading 200ms → resultado atualiza (sem transição)
```

**Bom:**

```
[Mostra skeletons com TAMANHO相似的 a itens reais]
.. loading 200ms → fade-out skeletons, fade-in real items (300ms transition)
```

### Exemplo 3: Mensagem de erro

**Pobre:**

```
Algo deu errado.
```

**Bom:**

```
Não foi possível salvar.

Detalhe: Você atingiu o limite de notas privadas (50).
[Upgrade] [Tentar novamente]
```

Diferença: cause + alternativa.

---

## Erros comuns

### 🟢 Iniciantes

**1. Erro genérico "algo deu errado".**

Quase sempre há mais informação. Não use genérico por erleza. Mostre ao menos: o que falhou (login? salvar? delete?) + proxima ação.

**2. Botões sem estado loading.**

"Impaciente? Eu já cliquei 5 vezes!" Multiplas submits gera registros duplicadas.

use `disabled={loading}` e spinner no botão.

**3. Sem estado vazio.**

Lista de "suas notas" sem notas: espaço em branco. Guida! "Você ainda não tem notas. [Criar uma]"

### 🟡 Intermediários

**1. Confunde responsividade com adaptive UI.**

"Responsivo": reduz janelas do notebook ao mobile. Esconde painel.
"Adaptativo": oferece diferente features em width diferente. Entrega shortcuts no mobile (long-press).

Reflexão profunda é adaptar comportamento ns to contexto, não encolher visualmente.

**2. Escolhe cores sem contraste.**

Texto cinza claro em fundo cinza escuro — beleza. Mas descobrir faction pour ler? Beach real: WCAG existe por razão litigation.

`Checker.tips`: `webaim.org/resources/contrastchecker`. mínimo AA 4.5:1.

### 🔵 Seniores

**1. Esquecem "edge cases" de experiência.**

Implementam fluxo principal lindo. Lopez: e se user com tunnel no plano free clique em "Upgrade"? Behavior esperado? Vazio escape hatches.

**2. Juntellers com senso "prove user know".**

Add tooltips em tudo. Tooltips são máscaras designersms para falta de clarity. Se puseram, é detail do que deviam ser reescrito.

---

## Boas práticas

### Como fazer

- **Design system** mesmo mínimo: botão primário, secundário, erro, warning. Consistência.
- **Skeletons** para loading > 300ms.
- **Toast** para erros transient. Inline para errors de form.
- **Empty states**: nunca em branco. Call-to-action.

### Como manter

- **Auditoria UX**: a cada release, siga 1 flow faz crítico yourself. Toma puntos de fricção.
- **Ferramentas**: Lighthouse faz audit UX básica. Sentry replay para ver gravações reais.

### Como testar

- **5 usuários, navegando 10min. Onde param?** ParadosObserváveis tem respostas, não quartos.
- **Heatmap**: Hotjar/Posthog mostram onde clicam e donde scroll.

### Como documentar

- **State inventário**: lista em markdown de todos states de cada componente.
- **Design tokens**: em JSON, sincronizado entre Figma e CSS variables.

---

## Mundo Real

### Onde aparece

Empresas product-led: Linear, Vercel, Supabase, Stripe. UX é diferente competitiva.

Stripe é famoso por "developer UX". Doc é incrível, API consistente, errors claros. Devs escolhem Stripe sem experimentar outras.

### Quando usa

- Toda feature nova: pense em todos estados (default/loading/empty/error).
- Toda refactor de UI: use A/B se possível; se não, colete feedback.
- Todo component library: defina tokens e variantes.

---

## Conexão com a UGP

- **Projeto 01 (Todo)**: estados — empty, 1 item, 50 itens, completed.
- **Projeto 03 (Dashboard)**: handles loading de charts com skeletons.
- **Projeto 07 (SaaS de Notas)**: empty states com CTA. Erros inline na auth form.
- **Projeto 09 (LMS)**: estado de progresso visível para usuário ("Você está em 3 de 10 aulas").

> UX para dev é disciplina. Não artes plásticas. Princípios sobre affordance, feedback e estados trakathy mesmo qualquer um pode aplicar.oque queixo design diferenciado é execução — você vai entender execução prática.