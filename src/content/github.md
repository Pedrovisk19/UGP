# GitHub para Engenheiros

## Introdução

Git é a ferramenta mais usada por desenvolvedores no mundo. E a **menos compreendida**.

Todo dev usa. Poucos entendem. A maioria decora 5 comandos: `add`, `commit`, `push`, `pull`, `status`. Quando algo dá errado — merge conflict, branch divergente, commit no lugar errado —, entra em pânico, apaga a pasta, clona de novo.

Este módulo te faz entender **o que o Git realmente é**, não só como usá-lo. Quando você entiende, merge conflict deixa de ser terror e vira conversa. Branch abandonada deixa de ser mistério e vira arqueologia. Você ganha controle.

GitHub, em cima do Git, é onde o código vive em colaboração. Pull requests, code review, issues, Actions — todo fluxo de trabalho moderno passa por aqui.

Quando você termina este módulo, você entende não só o "como", mas o **porquê** de cada comando.

---

## Contexto Histórico

### Antes do Git (até 2005)

Vamos voltar no tempo. Como times trabalhavam juntos antes do Git?

**CVS (Concurrent Versions System), 1986**: uma das primeiras ferramentas. Tracking line-by-line, mas travava em conflitos. Lento. Centralizado — se o servidor caía, ninguém trabalhava.

**SVN (Subversion), 2000**: melhorou o CVS. Ainda centralizado. Ainda lento para projetos grandes. Branching era difícil — tão difícil que times evitavam делать branches, trabalhando todos no `trunk`, quebrando-se mutuamente.

**BitKeeper, 2002**: distribuído. Rápido. O kernel Linux usou. Mas era proprietário. Em 2005, o dono revogou a licença grátis para a comunidade open source. Linus Torvalds — criador do Linux — ficou sem ferramenta.

### Linus escreve o Git (2005)

Em 10 dias, Linus escreveu o Git. Os objetivos:

- **Distribuído**: cada clone é um repositório completo. Sem servidor, você ainda commita, brancha, vê histórico.
- **Rápido**: projetado para lidar com o kernel Linux (milhões de arquivos).
- **Confusão-intencional**: a versão original era dura de usar. Mas os conceitos eram certos.

Linus disse uma frase famosa: *"I'm an egotistical bastard, and all my software is named after me. So, first I called it Linux. Now I called it Git."* (Git, em inglês britânico, significa pessoa desagradável.)

### GitHub (2008)

Git era poderoso mas duro. GitHub chegou em 2008 com uma ideia: colocar uma interface web no Git. Pull requests, forks, code review. Hoje é onde a maioria dos projetos open source vivem.

### Por que Git ganhou

Diferente de SVN/CVS, Git é **distribuído**. Isso significa:

- **Todo clone é um backup completo**. Servidor caiu? Você tem tudo localmente.
- **Branching é barato**. Em SVN, branch copia arquivos. Em Git, branch é uma etiqueta aponta para um commit.
- **Autonomia local**. Você commita offline, pusha quando tiver internet.

---

## Explicação Intuitiva

Imagine um livro que várias pessoas escrevem juntos.

**Modelo centralizado (SVN)**: há um manuscrito único na editora. Cada autor pega o manuscrito (somente ele), faz mudanças, devolve. Outros esperam. Se 2 autores pegam ao mesmo tempo, um sobrescreve o outro.

**Modelo Git**: cada autor tem uma **cópia completa** do livro em casa. Você escreve no seu, sem esperar ninguém. Quando quer compartilhar, manda um "diff" — só as páginas que mudaram — para a editora. A editora integra. Todo mundo pode ler as mudanças afterwards.

Mais ainda: em Git, você pode ter **versões paralelas** (branchs). Você está escrevendo uma nova versão do Capítulo 5, sem mexer na versão publicada. Quando a nova estiver boa, você integra (`merge`).

### O que é um commit?

Um commit é **uma foto do seu código em um momento**. Não guarda os arquivos inteiros de novo — só o que mudou desde a última foto.

Cada commit tem:
- Um ID único (hash SHA-1, ex: `a1b2c3d`)
- Uma mensagem ("Adicionei login with Google")
- Autor e timestamp
- Referência ao commit anterior

Isso forma uma **cadeia**. `commit 3 → commit 2 → commit 1`. Você pode voltar a qualquer ponto.

### O que é um branch?

Um branch é **um ponteiro para um commit**. Quando você cria `feat/login`, você diz "quero trabalhar a partir deste commit, mas em paralelo". Você commita. O ponteiro anda. Outros branches não mudam.

### O que é um merge?

Quando você une 2 branches. Git tenta automaticamente: se você mexeu em `arquivoA` e o outro branch mexeu em `arquivoB`, Git une os dois. Se ambos mexeram na mesma linha do `arquivoC`, Git diz "conflito — você decide".

---

## Funcionamento Técnico

### Os 3 estados do Git

Todo arquivo em Git está em um de 3 estados:

```
Working Directory  →  Staging Area  →  Repository
(modified)            (staged)         (committed)
```

1. **Working Directory**: você mexe nos arquivos. Ainda não disse ao Git que quer guardá-los.
2. **Staging Area**: você disse "quero incluir esses na próxima foto". Mas ainda não tirou a foto.
3. **Repository**: você commitou. A foto foi tirada. Está no histórico.

### Comandos essenciais — e por quê

```bash
git status          # O que mudou? O que está staged?
git add arquivo.js  # Move de working → staging
git commit -m "msg" # Tira a foto tira de staging → repository
git push            # Manda seus commits para o servidor (GitHub)
git pull            # Traz commits do servidor e une com os seus
git log --oneline   # Vê histórico curto
git branch          # Lista branches
git checkout -b X   # Cria e muda para branch X
git merge X         # Traz branch X para dentro da branch atual
```

### Conventional Commits

Padrão de mensagem que GitHub e ferramentas entendem:

```
feat: adiciona login com Google
fix: corrige cálculo de XP duplicado
docs: atualiza README
refactor: extrai função de cálculo
test: cobre edge case de birthday
chore: bumpa versão do Next
```

Por quê? Sem padrão, histórico vira lixo: "wip", "fix", "mais fix". Com padrão, ferramentas geram **CHANGELOG automático**, **versionamento semântico**, etc.

### Workflow GitHub Flow (mais usado)

1. Crie branch: `git checkout -b feat/login-google`
2. Faça commits pequenos, com mensagens claras
3. PUSH para GitHub: `git push -u origin feat/login-google`
4. Abra um Pull Request no GitHub
5. Code review (alguém revisa)
6. Merge na `main`
7. Delete o branch

### Por que branches pequenos?

Branches longos (1 mes) = muitos conflitos. Branches curtos (1-3 dias) = fácil integrar. Mantenha branches curtos.

---

## Exemplos

### Cenário: você está fazendo feature e a `main` andou

Você está em `feat/carrinho`, há 3 dias. A `main` recebeu 5 commits do João. Você precisa puxar essas mudanças antes de abrir PR.

```bash
git checkout main
git pull origin main           # atualiza sua main local
git checkout feat/carrinho
git merge main                 # une main no carrinho
# Possible conflitos. Resolva. Commit.
git push
```

### Cenário: você commitou no lugar errado

Mexeu em `main` direto, sem branch. Ainda não pushou.

```bash
git checkout -b feat/carrinho  # cria branch a partir daqui
git checkout main
git reset --hard HEAD~1        # main volta 1 commit (não pushado ainda!)
git checkout feat/carrinho
```

### Cenário: conflito de merge

```
Auto-merging carrinho.ts
CONFLICT (content): Merge conflict in carrinho.ts
```

Abra `carrinho.ts`:

```
function checkout() {
<<<<<<< HEAD
  const total = calcularComTaxa();
=======
  const total = calcularComDesconto();
>>>>>>> main
}
```

Escolha uma das versões (ou uma 3ª combinada). Remova os marcadores `<<<<<<<`, `======`, `>>>>>>>`. Salve.

```bash
git add carrinho.ts
git commit  # sem -m, abre editor. Salva msg default.
```

---

## Erros comuns

### 🟢 O que iniciantes fazem

**1. Commitam "wip".**

"Work in progress" não é mensagem. Ninguém sabe o que mudou. Você mesmo, daqui 3 meses, não vai saber.

Use Conventional Commits. `feat: adiciona botão de checkout`. Simples.

**2. Tudo num commit gigante.**

"feat: adiciona carrinho, login, payment, e mudanças no Profile" — 5 features num commit. Code review impossível. Reverter impossível.

Pequenos e frequentes. Um conceito por commit. Mesmo que no mesmo branch.

**3. Puxam direto da `main` de outras pessoas.**

Nunca mexa em `main` direto. Crie branch.

**4. Têm medo de conflito.**

Conflito é chance de pensar. Git fez o melhor自动. Você decide onde ele errou. É conversa, não bicho-papão.

### 🟡 O que intermediários fazem

**1. Rebase sem entiender.**

`git rebase` reescreve seu histórico. Útil para limpar commits antes de PR. Destrutivo se já pushou e outras pessoas estão no branch.

Regra: rebase **apenas no seu próprio branch não merged**.

**2. Force push sem pensar.**

`git push --force` sobrescreve histórico remoto. Se alguém pushou no meio, você apagou trabalho dele. Use `--force-with-lease` (Git verifica se ninguém mexeu).

### 🔵 O que seniores evitam

**1. Não commitam segredos.**

`API_KEY=sk-xxx` no `.env` commitado? Já era. Histórico Git é permanente. Mesmo se apagar, alguém pode achar.

Use `.gitignore`. Use variáveis de ambiente. Nunca commit segredo.

**2. Não mergem sem entender.**

Botão verde "Merge" no GitHub é fácil. Mas você leu o diff? Rodou os tests? Reviewer responsável é parte do engenheiro.

---

## Boas práticas

### Como fazer

- **Commits pequenos** — um conceito por commit
- **Mensagens claras** — Conventional Commits
- **Branches curtos** — 1-3 dias, máximo 1 semana
- **PR com descrição** — o que muda, por quê, como testar
- **`.gitignore` completo** — `node_modules/`, `.env*`, `dist/`, `.next/`

### Como manter

- **`git pull` diário** da `main`, evita drift grande
- **Histórico limpo** com rebase (no seu branch) antes de PR
- **Tags para releases** — `git tag v1.0.0` marca ponto estável

### Como escalar

- **Equipuação**: branches com prefixo do dono — `feat/joao/login`
- **Bot protection** na `main` — ninguém pusha direto, só via PR
- **CI obrigatório** — PR só merge se tests passarem

### Como testar seu conhecimento

Resolva estes sem Google:
1. Como desfazer o último commit **sem perder as mudanças**?
   <details><summary>Resposta</summary>`git reset --soft HEAD~1`</details>
2. Como ver diff entre 2 branches?
   <details><summary>Resposta</summary>`git diff main..feat/x`</details>
3. Como salvar mudanças sem commit, trocar de branch, e voltar?
   <details><summary>Resposta</summary>`git stash`, trabalhe, `git stash pop`</details>

### Como documentar

- **README.md** cominton guide e setup
- **CONTRIBUTING.md** com workflow de PR
- **CHANGELOG.md** gerado de conventional commits

---

## Mundo Real

### Onde isso aparece em empresas?

Em **todas**. Sem exceção. Se a empresa usa software, ela usa Git/GitHub.

### Fluxos reais

- **GitHub Flow**: branch → PR → review → merge. Mais comum em startups e produtos web.
- **Git Flow**: `develop`, `feature/`, `release/`, `hotfix/`. Mais rigoroso. Para produtos com versões (mobile, desktop).
- **Trunk-based**: commits direto na `main`, com feature flags. Google, Facebook usam. Exige teste rigoroso.

### Empresas que usam

- **Stripe**: GitHub Flow, conventional commits
- **Nubank**: Git Flow adaptado, code review obrigatório
- **Google**: Trunk-based com feature flags em sistemas internos próprios (Everything is a Git repo for current code)

### Quando você realmente usa

- Toda manhã: `git pull`
- Toda feature: branch + PR
- Todo bug fix: branch + PR
- Todo deploy: tag + release
- Toda discussão técnica: Issues do GitHub
- Toda automação: GitHub Actions (CI, deploy, lint)

---

## Conexão com a UGP

Depois deste módulo, você sabe Git como ferramenta. Próximos passos:

- **Docs as Code** — documentação versionada em Git, com markdown
- **GitHub Pages** — onde você publica seu blog pessoal (Projeto 05)
- **GitHub Actions** — CI que você configura no Projeto 09 (LMS)
- **Open Source** — todo projeto da UGP tem README, você publica no GitHub

Mas o mais importante: **cada projeto da UGP fica no GitHub**. Cada um com:
- README explicando o problema, a arquitetura, como rodar
- Conventional Commits
- PR mesmo que sozinho (você aprende o fluxo)
- Tags para versões finais

> Seu GitHub é seu portfólio técnico. Não é um backup do seu laptop. É onde recrutadores vão olhar e ver engenheiro, não amador.