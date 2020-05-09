
// criando o alias!
type MeuToken = string |  number;
function processaToken(token: MeuToken) {

    if (typeof (token) === 'string') {

        // typescript entende que é o tipo string e faz autocomplete para este tipo. A função replace só existe em string
        return token.replace(/2/g, 'X');
    } else {
        // toFixed só existe em number!
        return token.toFixed().replace(/2/g, 'X');
    }
}

/*  Apesar de ser um recurso da linguagem, essa estratégia remete à programação procedural 
    pois envolve uma sucessão de if's para detectar o tipo dos elementos. É por este motivo 
    que não foi utilizado em nosso projeto e demos preferência ao polimorfismo.*/
const tokenProcessado1 = processaToken('1234');
const tokenProcessado2 = processaToken(1234);