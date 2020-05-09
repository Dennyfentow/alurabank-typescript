import { Imprimivel } from "../models/Imprimivel";

export function imprime(...objects: Imprimivel[]) {
    objects.forEach(object => object.paraTexto());
}