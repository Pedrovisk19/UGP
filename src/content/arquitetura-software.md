# Arquitetura de Software

## O que é Arquitetura de Software?

Imagine que alguém peça para você construir uma casa.

Você pode simplesmente começar levantando paredes.

Ou pode primeiro responder algumas perguntas:

- Quantos quartos ela terá?
- Quantas pessoas irão morar nela?
- O terreno suporta dois andares?
- Onde ficará a parte elétrica?
- Como será a hidráulica?
- Como essa casa poderá ser ampliada daqui a cinco anos?

Perceba que antes de colocar um tijolo, alguém precisou pensar.

Com software acontece exatamente a mesma coisa.

Muitas pessoas acreditam que programar é escrever código.

Mas, na prática, escrever código representa apenas uma pequena parte do desenvolvimento de um sistema.

Antes disso, precisamos responder perguntas muito mais importantes:

- Como esse sistema será organizado?
- Como as partes irão conversar entre si?
- Onde ficam as regras de negócio?
- Como evitar que uma alteração quebre todo o projeto?
- Como facilitar a manutenção daqui a dois anos?

É justamente para responder essas perguntas que existe a **Arquitetura de Software**.

## O que é Arquitetura?

Arquitetura de Software é o processo de definir como um sistema será organizado antes mesmo de sua implementação.

Ela descreve:

- como os componentes serão divididos;
- como eles se comunicam;
- onde cada responsabilidade deve ficar;
- quais tecnologias fazem sentido utilizar;
- como o sistema poderá crescer sem virar um caos.

Arquitetura não é um framework.

Arquitetura não é uma biblioteca.

Arquitetura também não é uma pasta chamada `architecture`.

**Arquitetura é um conjunto de decisões.**

### Um exemplo simples

Imagine que você decidiu criar um sistema para uma clínica.

Sem arquitetura, talvez você faça algo parecido com isso:

```
controller
    ↓
acessa banco
    ↓
envia e-mail
    ↓
gera PDF
    ↓
faz cálculo
    ↓
consulta API
    ↓
retorna resposta
```

Tudo misturado.

Agora imagine que o sistema cresça.

Mais pessoas entram no time.

Novas funcionalidades aparecem.

Em pouco tempo ninguém entende mais o código.

Cada alteração quebra outra funcionalidade.

O famoso:

> "Não mexe nisso que funciona."

Esse é um sistema sem arquitetura.

Agora veja outro cenário.

```
Controller
    ↓
Service
    ↓
Caso de Uso
    ↓
Regras de Negócio
    ↓
Repositório
    ↓
Banco de Dados
```

Cada camada possui uma responsabilidade.

Cada arquivo faz apenas uma coisa.

Cada mudança fica previsível.

É isso que a arquitetura proporciona.

## Por que aprender Arquitetura?

Porque escrever código é relativamente fácil.

O difícil é manter esse código durante anos.

Imagine estes cenários:

- Um sistema com 500 mil linhas de código.
- Dez desenvolvedores trabalhando ao mesmo tempo.
- Novas funcionalidades toda semana.
- Bugs sendo corrigidos diariamente.

Sem uma arquitetura bem definida, o projeto rapidamente se torna impossível de evoluir.

### Um erro muito comum

Muitos iniciantes acreditam que arquitetura serve apenas para sistemas gigantes.

Na verdade, ela ajuda principalmente quem está aprendendo.

Quando você entende arquitetura:

- aprende mais rápido;
- organiza melhor seu raciocínio;
- escreve código mais limpo;
- consegue encontrar erros com facilidade;
- entende projetos grandes sem medo.

Arquitetura é organização.

E organização reduz complexidade.

## Arquitetura não é sinônimo de complexidade

Existe um mito de que arquitetura deixa tudo mais difícil.

Na verdade acontece exatamente o contrário.

Uma boa arquitetura faz com que sistemas complexos pareçam simples.

Ela divide grandes problemas em pequenos problemas.

E pequenos problemas são muito mais fáceis de resolver.

## Como a arquitetura vai ajudar durante a UGP?

Ao longo da Universidade Gratuita do Programador, você desenvolverá diversos projetos.

Você poderia simplesmente escrever código até tudo funcionar.

Mas nosso objetivo não é apenas criar aplicações.

**Nosso objetivo é formar engenheiros de software.**

Por isso, em cada projeto você aprenderá a responder perguntas como:

- Onde essa regra de negócio deve ficar?
- Quem é responsável por validar esses dados?
- Essa lógica pertence ao Controller?
- Essa funcionalidade deveria conhecer o banco de dados?
- Como testar essa regra sem depender da interface?
- Como trocar o banco de dados sem reescrever tudo?

Essas perguntas fazem parte do dia a dia de qualquer desenvolvedor profissional.

### Pense como um engenheiro

Um programador normalmente pergunta:

> "Como faço isso funcionar?"

Um engenheiro pergunta:

> "Como faço isso continuar funcionando daqui a cinco anos?"

Essa pequena mudança de pensamento muda completamente a qualidade do software.

## Arquitetura é uma habilidade

Você não aprende arquitetura decorando nomes como:

- MVC
- Clean Architecture
- Hexagonal
- Onion
- DDD

Você aprende arquitetura **resolvendo problemas**.

Ao longo da UGP você verá exatamente isso.

Cada projeto começará simples.

Conforme novos problemas aparecerem, novas decisões arquiteturais serão necessárias.

Assim, você entenderá *por que* determinada arquitetura existe, em vez de apenas decorar diagramas.

## O maior objetivo deste módulo

Ao final desta jornada, quero que você pare de pensar apenas em código.

Quero que você olhe para qualquer sistema e consiga responder:

- Como ele foi organizado?
- Quais responsabilidades existem?
- Onde estão as regras de negócio?
- Como ele pode crescer?
- Quais decisões arquiteturais foram tomadas?
- O que eu faria diferente?

Quando você conseguir fazer isso, terá dado um passo importante para deixar de ser apenas alguém que escreve código e começar a pensar como um engenheiro de software.

## Reflexão Final

> "Código resolve o problema de hoje. Arquitetura resolve os problemas de amanhã."

Essa frase resume muito bem o propósito deste módulo. Durante a UGP, você verá que uma boa arquitetura não é sobre complicar um projeto com padrões e diagramas, mas sobre tomar decisões conscientes para que o software continue evoluindo com qualidade. Cada projeto da plataforma será uma oportunidade de praticar esse pensamento, entendendo que a verdadeira habilidade de um engenheiro de software não está em conhecer dezenas de frameworks, mas em saber projetar sistemas que outras pessoas consigam entender, manter e evoluir ao longo do tempo.
