# HeaderGuard — Auditor de Cabeçalhos HTTP

CLI em **JavaScript / Node.js** para verificar, de forma não intrusiva, a presença de alguns cabeçalhos associados à proteção de aplicações web.

## Verificações

HSTS, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy e Permissions-Policy. Retorna um relatório estruturado em JSON. Não segue redirecionamentos automaticamente nem varre páginas ou endpoints.

## Uso

Requer Node.js 20 ou superior. Não possui dependências externas.

    node cli.mjs https://example.com
    npm test

A ferramenta realiza somente uma requisição HEAD por execução. **Execute apenas em sites próprios ou para os quais você tenha autorização de teste.** A ausência de um cabeçalho não prova vulnerabilidade, e a presença não garante sua configuração correta. Cabeçalhos são avaliados no contexto da resposta recebida; aplicações podem ter requisitos diferentes.

## Tecnologias
JavaScript, Node.js, Fetch API, testes nativos node:test.
