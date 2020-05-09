export interface Imprimivel {
    // Classe abstrata para que haja polimorfismo em Utils.ts, no método imprime(object: Imprimivel)
    paraTexto(): void;

}