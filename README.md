# Engenharia de Software 2: Sistema de gerenciamento de cartões de crédito

**Alunos**:  
- André Luís Ribeiro - 2018054397  
- Daniel Ferreira Abadi - 2018088062  
- Igor Castejon Fonseca e Castro - 2018088070

## Apresentação

Este repositório contém a implementação de um sistema de gerenciamento do uso de cartões de crédito. Um problema comum nas empresas consiste na utilização de cartões de crédito compartilhados por diferentes funcionários, que os requerem à empresa para fins de despesas de trabalho, como de hotel e alimentação. A gestão desses cartões é fundamental para garantir que ao ceder um cartão, ele possua o limite necessário e os usuários não tenham suas compras negadas. Além disso, essa gestão auxilia na detecção do uso indevido de cartões, clonagem de cartões ou até mesmo fraudes dentro da empresa.

O sistema proposto tem como propósito registrar e gerenciar cartões de crédito e seus usos por usuários. A partir desse propósito, o seu objetivo é possibilitar a auditoria do uso de múltiplos cartão de crédito por múltiplos usuários de forma facilitada, além de permitir que os usuários possam verificar o saldo do cartão antes de utilizá-lo. Destaca-se, portanto, que o objetivo do sistema não é de realizar pagamentos ou possibilitar o uso de um cartão de crédito em si, mas sim gerenciar seu uso. 

No sistema estão presentes entidades que representam os usuários, os cartões de crédito e os usos desses cartões de cŕedito pelos usuários. Dentre as funções implementadas, temos as opções de registrar e obter usuários e cartões de crédito. Além disso, é possível registrar o uso de um cartão de crédito por um usuário dado o usuário, o cartão e uma transação válida realizada por ele.

## Tecnologias utilizadas
Para o desenvolvimento desse sistema foi utilizado o framework Express, para Node.js, com a utilização da linguagem Typescript. A utilização de Typescript adiciona a opção de tipagem à sintaxe de JavaScript, o que favorece o gerenciamento de tipos de dados no sistema. A utilização de Express no Node.js, por sua vez, auxilia na criação de APIs de forma robusta e facilitada. De maneira auxiliar, foram utilizadas também as bibliotecas Knex.js para a geração e execução de consultas SQL de forma flexível e portável e a biblioteca express-validator para a validação de dados.

## Instalação
Para instalar o sistema, execute o comando ```npm install```, seguido do comando ```npm run run-migrations```.

## Utilização do sistema
Para inicializar o sistema, utilize o comando ```npm run dev```.
O foco deste trabalho se deu na aplicação de boas práticas de engenharia de software ao desenvolvimento de um sistema simples. Assim, optou-se por fazê-lo sem interface gráfica, focando na modelagem e na arquitetura do sistema. Dessa forma, a utilização do sistema se dá através de uma API com as seguintes rotas disponíveis:
