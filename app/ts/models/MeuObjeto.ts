import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

export interface MeuObjecto<T> extends Imprimivel, Igualavel<T>{

}