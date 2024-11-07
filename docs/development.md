# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | João | index.html |
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês | Ana Paula | cadastro-noticia.html |

| ID     | Descrição do Requisito                                                                                                 | Responsável | Artefato Criado     |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------- |
| RF-001 | Permitir que os usuários se cadastrem no sistema                                                                       | Kesley      | login-cadastro.html |
| RF-002 | Permitir que os usuários façam login e logout                                                                          | Kesley      | login-cadastro.html |
| RF-003 | permitir que as organizações possam exportar relatórios semanais e mensais                                             | Ester       | user-ong.html       |
| RF-004 | Desenvolver uma página onde as Instituições possam registrar suas atividades, métricas mensais e relatórios de retorno | Ester       | user-ong.html       |
| RF-005 | Desenvolver uma página com conteúdos básicos sobre gestão e negócio                                                    |             |                     |
| RF-006 | Facilitar a busca por oportunidades de voluntariado                                                                    | Ana         | eventos/index.html  |
| RF-007 | Notificar os usuários sobre novas oportunidades de voluntariado                                                        |             |                     |
| RF-008 | permitir que o usuário cadastre suas preferências de área de atuação das ONGs                                          |             |                     |
| RF-009 | Desenvolver uma página com o dashboard de dados mensais e semanais                                                     | Ester       | user-ong.html       |
| RF-010 | permitir que os usuários doadores possam visualizar as métricas e ficar a par dos resultados das ONGs                  | Ester       | v2-user-ong.html    |

## Descrição das estruturas:

## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

