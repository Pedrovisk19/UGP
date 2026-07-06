# Test-Driven Development (TDD)

## Introdução

Test-Driven Development é frequentemente apresentado como "escreva testes antes do código". Isso é a técnica. Mas a filosofia vai mais fundo: **TDD descreve o comportamento desejado antes de implementá-lo**.

Você escreve um teste que diz "quando X acontece, Y deve resultar". O teste falha — porque Y ainda não existe. Aí você escreve o código que faz Y. Teste passa. Refatora.

A sequência é simples: **Red** → **Green** → **Refactor**. Vermelho (teste falha), Verde (passa), Refatora (melhora código sem mudar comportamento).

Mas por que isso é importante? Por que escrever testes antes é melhor que depois? E quando TDD é **perda de tempo**?

Até o fim deste módulo, você vai saber.

---

## Contexto Histórico

### Testes manuais (antes de核1950)

Engenheiros rodavam suas fórmulas à mão. "Vamos ver se 2+2=4". Verificavam algumas entradas. Em código, mesma coisa: rodar programa, inserir dados, observar.

### Testes automatizados (1950-2000)

Computadores começaram a testar computadores. Ferramentas como JUnit (Java, 2000) popularizaram testes unitários.

Mas eram adicionados após o código. Devs escreviam feature, depois escreviam testes para cobrir. Problema: testes escritos depois validam o que foi escrito — não o que deveria ser.

### TDD e Kent Beck (~2000)

Kent Beck, engenheiro americano, formalizou TDD no livro *Test-Driven Development: By Example* (2002). Ele disse: escreva o teste primeiro. Ele define o comportamento. Aí você implementa.

Resultou em:
- **Design testável** — para testar X, X precisa ser isolado. Isso empurra modularidade.
- **Confiança** — você sabe que X funciona porque temteste que prova.
- **Refatoração segura** — com testes, você muda implementação e os testes garantem que comportamento não mudou.

### Pirâmide de testes (Mike Cohn, 2009)

Mike Cohn propôs a "Test Pyramid": muitos unit tests na base, menos integration tests no meio, poucos end-to-end tests no topo.

Por quê? Unit tests são rápidos e específicos. E2E testam tudo mas são lentos e frágeis. A pirâmide equilibra.

### Behavior-Driven Development (BDD, ~2006)

Dan North propôs BDD: tests escritos como comportamento ("Given/When/Then"), não como estrutura técnica. Ferramentas como Cucumber, Jest BDD.

BDD não substitui TDD — é TDD com vocabulário de negócio, para odnalizadores não-técnicos poderem entender.

---

## Explicação Intuitiva

Imagine construir uma ponte.

**Testes depois**: você constrói a ponte inteira. Depois testa passar um caminhão de 40 toneladas. Se a ponte cai, agora você precisa descobrir onde — entre 1000 vigas soldadas.

**TDD**: antes de soldar a viga, você define "esta viga precisa aguentar 40 toneladas sem deformar mais de 2cm". Você testa essa viga isoladamente. Passa? Aí instala na ponte.

Duzentos anos depois, um caminhão de 50 toneladas sobrevive. Você sabe porque cada viga foi testada individualmente.

Em software:
- Sem TDD: escreve função complexa. Bug aparece em produção. Onde está? Entre 50 linhas.
- Com TDD: cada comportamento tem teste. Bug aparece em produção. Você roda testes — 95 passam, 1 falha. Está na funcionalidade Y.

---

## Funcionamento Técnico

### Os 3 estágios do ciclo TDD

#### 1. Red — escrever teste que falha

```ts
// calculadora.test.ts
import { somar } from './calculadora'

test('somar 2 + 3 retorna 5', () => {
  expect(somar(2, 3)).toBe(5)
})
```

`somar` ainda não existe (ou retorna `null`). Teste falha: "somar is not defined" ou "expected 5, received null".

Por quê falha é bom?
- Confirma que o teste RODA (não tem erro de sintaxe).
- Confirma que você está testando a coisa certa.
- Falha "esperada" — pronto para implementar.

#### 2. Green — implementar o mínimo

```ts
// calculadora.ts
export function somar(a: number, b: number) {
  return a + b
}
```

Teste passa. **Pare**. Não adicionei features extras (subtrair? multiplicated? Não. YAGNI.)

#### 3. Refactor — melhorar sem mudar comportamento

```ts
// Opção: mais idiomático
export const somar = (a: number, b: number): number => a + b
```

Teste ainda passa. Refactor é seguro.

### Níveis de teste

#### Unitário

Testa uma função isolada. Rápido (< 10ms). Centenas deles.

```ts
test('desconto de 10% em R$100 retorna R$90', () => {
  expect(aplicarDesconto(100, 10)).toBe(90)
})
```

#### Integration

Testa componentes juntos. Mais lento (~ 100ms). Dezenas.

```ts
test('carrinho com 2 produtos e cupom de 10%', async () => {
  const carrinho = novoCarrinho()
  await carrinho.add(produto1, 2)
  await carrinho.add(produto2, 1)
  await carrinho.aplicaCupom('UGP10')
  expect(carrinho.total()).toBe(180) // R$ 200 - R$ 20
})
```

#### End-to-end (E2E)

Testa fluxo completo pela UI. Lento (segundos). Poucos (dezenas no máximo).

```ts
test('usuário faz checkout com sucesso', async ({ page }) => {
  await page.goto('/')
  await page.fill('[data-testid=email]', 'user@test.com')
  await page.click('button Checkout')
  await expect(page.locator('text=Pedido confirmado')).toBeVisible()
})
```

### Pirâmide

```
       E2E (poucos, lentos)
      /                      \
     /   Integration           \   (alguns, médios)
    /                            \
   /________________________________\
   Unit (muitos, rápidos)
```

Regra: 70% unit / 20% integration / 10% E2E. Inverter é caro e frágil.

### Mock e Stub

- **Mock**: substitui uma função por uma que NÃO executa nada além de retornar um valor fixo. (ex: `mockFn.mockReturnValue(42)`)
- **Stub**: stub de implementação — não só retorna valor fixo, mas assertion de que foi chamado com certo argumento.

Uso: testar unidade que depende de outra (DB, email, API externa). Mock evita chamar a dependência.

```ts
// Em vez de chamar o gateway de pagamento real:
const mockPagamento = jest.fn().mockResolvedValue({ status: 'paid' })
checkoutPagamento(userId, mockPagamento)
expect(mockPagamento).toHaveBeenCalledWith(...)
```

---

## Exemplos

### Exemplo 1: implementar carrinho com TDD

Testes que guiam o desenvolvimento:

```ts
// carrinho.test.ts
test('carrinho novo tem total 0', () => {
  const c = new Carrinho()
  expect(c.total()).toBe(0)
})

test('adicionar produto R$50 aumenta total para R$50', () => {
  const c = new Carrinho()
  c.adicionar({ nome: 'Caneca', preco: 50 })
  expect(c.total()).toBe(50)
})

test('adicionar 2 produtos diferentes → total é soma', () => {
  const c = new Carrinho()
  c.adicionar({ nome: 'Caneca', preco: 50 })
  c.adicionar({ nome: 'Camisa', preco: 30 })
  expect(c.total()).toBe(80)
})

test('cupom UGP10 aplica 10% de desconto', () => {
  const c = new Carrinho()
  c.adicionar({ nome: 'Caneca', preco: 100 })
  c.aplicarCupom('UGP10')
  expect(c.total()).toBe(90)
})

test('cupom inválido não aplica desconto', () => {
  const c = new Carrinho()
  c.adicionar({ nome: 'Caneca', preco: 100 })
  expect(() => c.aplicarCupom('INVALID')).toThrow('Cupom inválido')
})
```

Implementação incremental:

```ts
class Carrinho {
  private itens: { nome: string; preco: number }[] = []
  private desconto = 0

  adicionar(item: { nome: string; preco: number }) {
    this.itens.push(item)
  }

  total() {
    const soma = this.itens.reduce((a, b) => a + b.preco, 0)
    return soma * (1 - this.desconto)
  }

  aplicarCupom(codigo: string) {
    if (codigo === 'UGP10') this.desconto = 0.1
    else throw new Error('Cupom inválido')
  }
}
```

Tudo coberto. Refatore com confiança.

### Exemplo 2: TDD em UI

Testar hook custom:

```ts
// use-counter.test.ts
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './use-counter'

test('counter inicia em 0', () => {
  const { result } = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
})

test('increment muda para 1', () => {
  const { result } = renderHook(() => useCounter())
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
})
```

---

## Erros comuns

### 🟢 Iniciantes

**1. Não testam porque "lentos".**

Não, testes RP—テストفلها 100 em 200ms. O que é lento é o setup ruim (DB em cada teste, renderizção de página inteira).

**2. Testam módulos, não comportamentos.**

"Aqui vou testar a função calcular" — teste detalhes internos. Teste **behaviors**: dados input X, retorna Y.

**3. Criam testes difíceis de entender.**

100 linhas de setup com mocks anônimos. Se teste quebra, ninguém entende. Código de teste é código — qualidade também.

### 🟡 Intermediários

**1. Buscam 100% cobertura à custa de qualidade.**

Cobertura metric implementa inevitavelmente "linhas executadas". Garantir coverage 100% te faz testar getters/setters triviais. Valor real? Zero.

Mire cobertura de comportamentos críticos. 80% com testes significativos > 100% com testes vazios.

**2. Testes acoplados à implementação.**

"Muda a ordem do `select` na implementação → 5 testes quebram." Testes devem validar **saída**, não a forma interna.

### 🔵 Seniores

**1. Não testam fluxo E2E.**

"Ah, unit cobre tudo." Não cobre. E2E valida que as peças se falAm — autenticação no meio, integração de coisa que nunca foi unit integrada.

**2. Não refatoram testes.**

Teste é código. Teste de 5 anos com `setup()` de 300 linhas é dívida. Refatore também.

---

## Boas práticas

### Como fazer

- **AAA**: Arrange, Act, Assert. Setup, ação, validação. Mantenha cada seção limpa.
- **One concept per test**: cada teste valida UMA coisa. Se quebra, você sabe o quê.
- **Fast**: testes unit devem rodar em < 5s (centenas). Se demoram mais, mocks mal feitos.

### Como manter

- **CI obrigatório**: PR sem teste passando não merge. Sem isso, testes viram sugestão.
- **Refatoração de testes**: se um teste começa com 100 linhas de setup, exija mais do código fonte. Bom código é testável.

### Como escalar

- **Test data factories**: gere dados de teste com factories, não hardcoded. Mudou schema? Muda em 1 lugar.
- **Snapshot**: use com cautela. Snapshot de componente é rápido mas ninguém revê. Use em UI estrutural apenas.

### Como testar

Pratique "testar o que pode quebrar":
- Lógica de cálculo de preço → sim
- Componente que só passa props → não
- Página estática → não
- Fluxo de checkout → E2E sim

### Como documentar

- Tests como documentação: lendo testes, dev novo entende o comportamento esperado.
- README de testes: `npm test` unit, `npm run test:e2e` E2E.

---

## Mundo Real

### Onde aparece

- **Stripe**: cobertura obrigatória em mudanças críticas (pagamentos).
- **Nubank**: testes de contrato (consumer-driven contracts) entre microsserviços.
- **GitHub**: TDD em mudanças no Ruby on Rails core.
- **Google**: a regra é que toda mudança tem teste que prova o fix.

### Quando usa

- Toda feature nova — TDD.
- Toda bugfix — primeiro teste que reproduz bug, depois fix.
- Refactors grandes — testes garantem comportamento preservado.

### Limites do TDD

- **UI experimental**: você ainda não sabe o que quer. Teste específico é cedo.
- **Spikes**: protótipos descartáveis. Não vale o custo.
- **Exploração de API externa**: depende se é estável. Não vale a pena testar a API alheia.

---

## Conexão com a UGP

- **Projeto 03 (Dashboard)** — adicione testes para cálculos de KPIs
- **Projeto 07 (SaaS de Notas)** — testes de RLS: usupário não vê notas de outro
- **Projeto 09 (LMS)** — cobertura exigida ≥80%. CI no GitHub Actions.
- **Projeto 10 (Clone do Supabase)** — testes de contrato entre serviços

> TDD não é religião. É disciplina. Você pode ser bom dev sem TDD. Mas com TDD, você é bom dev E confiante. Confiante que mudanças não quebram_behavior esperado. Isso é engenharia.