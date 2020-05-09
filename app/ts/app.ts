import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();
// adicionando o Onsubmit para o método adiciona do controler
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importarDados.bind(controller));

// Sem o JQuery
// document.querySelector('.form')
// .addEventListener('submit', controller.adiciona.bind(controller));