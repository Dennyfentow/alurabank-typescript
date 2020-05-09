import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/Utils';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes;
    private _negociacoesView = new NegociacoesView('#negociacoesView', true); // parametro de segurança para caso haja script no model (opticional)
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        // casting explicito em <HTMLInputElement>
        // Lazy Loading
        this._negociacoesView.update(this._negociacoes);
    }
    @throttle(500)
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (this.ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }

        const negociacao = new Negociacao(data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )
        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);


        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

    }

    @throttle()// Delay ao clicar em importar, sem parâmentro para o uso no ambiente de desenvolvimento
    async importarDados() {
        // tratamento de erro funcinando parecido com Java e C#, parecendo sincrono, porém será executado de maneira asyncrona.
        try {
            //      Uso do async e await!
            // Função funcionando de modo assíncrono, ou seja, a função será suspensa até o final desta linha de código! 
            // após o final da promisse, será retornado o parâmentro do then para negociacoesParaImportar, com o uso do await, Magic!
            const negociacoesParaImportar = await this._service.obterNegociacoes((res) => {
                // Passando uma função que possui um response como parâmetro e retorna um response, conforme informando na interface ResponseHandle
                if (res.ok) return res;
                else throw new Error(res.statusText);
            });

            // Após isto, será continuado a execução do código, pausa ali em cima, o sistema continua rodando, depois volta pra cá!
            const negociacoesImportadas = this._negociacoes.paraArray();
            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesImportadas
                        .some(jaImportada =>
                            negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);

        } catch (err) {
            // o tratamento de erro vem pra cá para manter apenas um retorno da promisse em NegociacaoService.obterNegociacoes
            this._mensagemView.update('Não foi possível importar os dados!');
            console.log(err.message);
        }

    }

    private ehDiaUtil(data: Date) {
        // se não for Domingo ou Sábado, será dia útil
        return data.getDay() == DiaDaSemana.Domingo || data.getDay() == DiaDaSemana.Sabado;
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado,
}