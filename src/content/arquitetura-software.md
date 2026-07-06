# Arquitetura de Software

## Introdução

Arquitetura de software não é sobre escolher stacks. É sobre **decidir o que não fazer**.

Toda decisão arquitetural é um trade-off. Cada escolha abre caminhos e fecha outros. Quem entende arquitetura não escolhe "o melhor" — entende que "melhor" depende de contexto. Em empresa, "melhor" é o que resolve seu problema com custo aceitável.

Quando você termina este módulo, consegue olhar para um sistema (incluso este app da UGP que você está usando) e enxergar as decisões que ele esconde. E consegue defender uma decisão técnica com argumentos, não com sentimento.

---

## Contexto Histórico

### Monolito (até 2010)

Tudo num só processo: frontend, backend, banco, auth, queued jobs. Simples de deployar (1 servidor). Simples de debugar. Simples de começar.

Mas monólitos grandes viram monólitos "de pedra" — mudanças pequenas tocam tudo. Times pisando uns nos outros no mesmo código.

### SOA — Service Oriented Architecture (anos 2000)

Ideia: dividir em serviços que se falam por SOAP/XML. Teoricamente bom. Na prática lento, complexo, com coordination centralizada (ESB - Enterprise Service Bus) que virou gargalo.

### Microsserviços (2010-presente)

Ideia: serviços pequenos, independentes, cada um dono de um domínio, comunicando por APIs leves (REST/gRPC). Nascimento do "you build it, you run it" (Amazon).

Resultou em: deploy independente, escala por serviço, ownership clara. Custo: infra complexa, observabilidade nova (distributed tracing), rede éLaneLessToday— falhas de rede viram parte do código.

### Volta a monólitos modulares (~2020-presente)

Muitas empresas que adotaram microsserviços prematuros voltaram a monólitos modulares. Base de código única, mas com módulos bem separados (cada um como domínio interno). Ex: Shopify, Basecamp.

Lição: o problema de monólito grande **não é arquitetura de monólito**. É ausência de modularidade dentro dele.

---

## Explicação Intuitiva

Imagine construir uma casa.

**Sem arquitetura**: você começa a colocar tijolos. Vai adicionando quartos onde parece bom. Funciona? Talvez. Mas quando precisa passar eletricidade, descobre que tijolo está em todo lugar. Quando ampliar, descobre que a fundação não aguenta.

**Com arquitetura**: você desenha antes. Decide onde vai cozinha, onde vão qu pouvoir encanamentos, onde vai carga estrutural. Mesmo que mude durante a construção, a planta inicial orienta.

Em software é igual. Você pode codar sem arquitetura — até não pode. Quando aparece o primeiro problema de escala (mais usuários, mais devs, mais features), arquitetura inexistente vira caos.

### Camadas como analogia

A diferença entre código bagunçado e código arquitetado é **camadas com responsabilidades claras**:

- **Apresentação** (UI): mostras dados ao usuário, captura clicks
- **Domínio** (regras): o que o sistema SIGNIFICA (ex: "user só vê próprio carrinho")
- **Dados** (banco): persistência técnica
- **Infra**: serviços externos (email, pagamentos, cache)

Quando UI conhece SQL → bagunça. Quando UI fala com domínio, domínio fala com dados, dados fala com banco → composto.

---

## Funcionamento Técnico

### Padrões arquiteturais principais

#### 1. Monolito Modular

```
app/
├── modules/
│   ├── auth/         ← UI + regras + dados
│   ├── billing/     ← UI + regras + dados
│   └── users/
└── shared/
    └── ui/
```

Tudo num deploy. Mas módulos bem separados internamente. Comunicação entre módulos via interfaces explícitas.

**Quando usar**: 90% dos casos. Comece aqui.

#### 2. Camadas (Layered Architecture)

```
Presentation  →  Application  →  Domain  →  Infrastructure
(UI)            (use cases)     (rules)    (DB, APIs)
```

Cada camada só conhece a imediatamente abaixo. Presentation não conhece Banco.

**Trade-off**: Simples. Pode virar "tudo transita por todas as camadas" rit bloat.

#### 3. Hexagonal (Ports & Adapters)

```
       ┌──────────────────────────┐
       │   Domínio (regras)        │
       │   Ports: интерфейce         │
       └──────────────────────────┘
            ▲                ▲
       Adapters           Adapters
       (HTTP, CLI)         (Postgres, MongoDB, Mock)
```

O domínio é isolado. Define interfaces (ports). Implementações (adapters) são trocáveis. O domínio **não sabe** se fala com Postgres ou MongoDB.

**Quando usar**: Quando você precisa testar domínio sem infra. Quando pode trocar banco. Em sistemas de missão crítica.

#### 4. Microsserviços

```
[Auth Service] ──HTTP──> [Order Service] ──HTTP──> [Payment Service]
                                                  
                            [Database per Service]
```

Cada serviço é independente — deploy, banco, escala. Comunicação por rede.

**Quando usar**: Quando times são grandes (>40 devs num monólito que se pisam). Quando requisitos de escala são radicas por serviço (pagamentos mil processa, auth bilhões). Senão, NÃO.

#### 5. Event-Driven

```
[Order Service] ──emits "order.created"──> [Message Broker (Kafka)] 
                                              │
                ┌─────────────────────────────┼─────────────────────────┐
                ▼                             ▼                         ▼
        [Email Service]            [Analytics Service]       [Inventory]
```

Serviços não se chamam diretamente. Publicam eventos. Quem quiser, escuta.

**Quando usar**: Quando o sistema precisa reagir a coisas (alerts, logs, sync). Quando serviços não podem esperar uns aos outros. Trade-off: consistência eventual (eventualmente tudo se sincroniza, não imediatamente).

---

## Princípios Universais

### 1. Separação de Responsabilidades (SoC)

Cada parte faz UMA coisa. UI mostra. Domínio Decide. Dados persiste. Misturar é atalho que vira dívida.

### 2. Coesão alta, acoplamento baixo

- **Coesão alta**: coisas que mudam juntas ficam juntas. Component de carrinho + lógica de carrinho + tipos de carrinho no mesmo módulo.
- **Acoplamento baixo**: módulos não dependem uns dos outros diretamente. Dependem de interfaces.

### 3. YAGNI (You Aren't Gonna Need It)

Não construa para necessidades futuras inventadas. Construa para o que você tem hoje. Com modularidade, você adiciona depois. Sem modularidade, "futuro" nunca chega — você está ocupado refatorando um spaghetti.

### 4. KISS (Keep It Simple, Stupid)

A solução mais simples que resolve o problema é a melhor. Não acrescente complexidade sem razão. Abstrações sem necessidade são piores que código duplicado.

### 5. Trade-offs explícitos

Não há arquitetura certa. Há arquitetura que resolve SEU problema com SEU contexto. Decisões devem ser documentadas (ADRs, lembram?) para que novos devs entendam por quê.

---

## Exemplos

### Sistema 1: Helpdesk (SaaS pequeno)

400 empresas clientes, 1-50 usuários cada. 5 devs.

**Decisão**: Monolito modular em Next.js + Prisma + Postgres single instance.

**Por quê**: Simples. Devs pequenos. Deploy fácil. Funciona em RDS médio.

Arquitetura:
- `app/modules/tickets` — features de chamados
- `app/modules/companies` — features de empresa
- `lib/auth`, `lib/db` — shared

### Sistema 2: Nubank CC charges

10M Kunden. Charges need to process millions per day. Audit legais. 1000 devs.

**Decisão**: Microsserviços. Clojure como linguagem dominante (menes bug de concorrência). Event-driven com Kafka.

**Por qué**: Cada serviço escala sozinho. Auditabilidade por evento. Times pequenos (pizza team ~8 pessoas) own serviços.

### Sistema 3: Biblioteca pessoal de componentes

1 dev (você, em Projeto 05 da UGP).

**Decisão**: Monólito. Padrão Route Groups do Next.js. Sem DDD formal.

**Por quê**: Custo de microsserviços >> valor. YAGNI.

---

## Erros comuns

### 🟢 Iniciantes

**1. Confundem arquitetura com framework.**

"Eu uso React, então minha arquitetura é React." Não. React é ferramenta. Arquitetura é COMO você organiza.

**2. Tudo no`app/`.**

Pastas desorganizadas sem módulos. Mesmo em projeto pequeno, organize.É mais fácil manter desde cedo que refazer depois.

### 🟡 Intermediários

**1. Over-architecting.**

Acha que DDD + hexagonal + CQRS é o "certo". Aplica em projeto de 100 usuários. Resultado: 5 abstrações para 1 feature. Veja o difícil de fazer "hello world" em 8 camadas.

**2. Acoplamento escondido.**

Camadas separam nomes, mas serviços ainda se conhecem profundamente. Muda banco → UI quebra. Isso é ilusão de separação.

### 🔵 Seniores

**1. Não revisitar decisões.**

Arquitetura de 3 anos atrás ainda usada mesmo quando não atende mais. "Mas funciona". Sim, mas a um custo cada vez maior.

**2. Adotar pattern sem experiência.**

Lêu sobre service mesh, implementou, ninguém sabe debugar. Padrões novos devem ser experimentados primeiro em baixa escala.

---

## Boas práticas

### Como fazer

- **Comece por monólito modular**. Microsserviço é opção futura.
- **Module boundaries explícitos**. Cada domínio tem pasta própria.
- **Dependências apontam inward**: camadas externas dependem de internas. Domínio não conhece detalhes externos.
- **Interfaces como contratos**: cada módulo expõe tipos/funcs. Internos à ele.

### Como manter

- **Diagramas do sistema**: um C4 model (context, container, component, code)
- **Mapa de dependências**: visualize o que depende do que
- **Módulo testável**: cada módulo tem testes próprios. Refatorar um não quebra outros.

### Como escalar

- Descida modular → quando módulos começam a pedir deploy independente, é hora de extrair microsserviço.
- **Domain-driven design**: quando dominio é complexo, DDD ajuda a mapear sua linguagem (ubiquitous language), contexto limitados (bounded contexts).

### Como documentar

- ADR para toda decisão arquitetural não-trivial
- Diagrama de arquitetura em README ou docs/
- Glossário de termos do domínio

### Como testar

- **Arquitetura testável**: troque DB por mock. Se quebra mais que 5 linhas, arquitetura está ruim.
- **Detox**: roda flow end-to-end. Se flow E2E é impossível sem 3 servidores up, complexidade alta.

---

## Mundo Real

### Onde aparece

Stripe, Nubank, Spotify, Netflix — todas têm equipes de arquitetura cuja função não é "decidir stacks", mas **facilitar decisões de outros times**. Padrões, templates, gateways, internal libraries.

### Quando você usa

- Todo sistema novo: você desenha
- Todo refactoring: você decide o que move
- Toda escolha de biblioteca: você pensa em lock-in
- Toda reunião de "fazemos microsserviços?": você traz realismo

### Que tipo de sistema depende disso

Todos. Mesmo site simples tem decisões arquiteturais (estático vs dinâmico, com cache ou sem). Decisões inconscientes viram dívidas.

---

## Conexão com a UGP

- **Arquitetura da UGP** (Fundamentos) — caso concreto
- **Projeto 07 (SaaS de Notas)** — você decide modular vs camadas
- **Projeto 08 (CMS)** — você decide como separar admin e público
- **Projeto 09 (LMS)** — múltiplos domínios (estudante, instrutor, conteúdo)
- **Projeto 10 (Clone do Supabase)** — arquitetura distribuída real

> Arquitetura é sobre **consciência**. Código sempre tem arquitetura — boa ou má. Você não escolhe ter; escolhe ter **clara** ou Frankenstein. intelligence.