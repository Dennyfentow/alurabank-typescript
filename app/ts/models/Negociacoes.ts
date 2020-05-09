import { Negociacao } from './Negociacao';
import { MeuObjecto } from './MeuObjeto';
// import { logarTempoDeExecucao } from '../helpers/decorators/index';

export class Negociacoes implements MeuObjecto<Negociacoes>{
    private _negociacoes: Negociacao[] = [];

    // @logarTempoDeExecucao(true)
    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }
    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}