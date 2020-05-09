export function logarTempoDeExecucao(emSegundos: boolean ) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;
        
        descriptor.value = function(...args: any[]) {
            console.log('-----------------------')
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`Resultado do método: ${JSON.stringify(resultado)}` )
            console.log(`${propertyKey} demorou ${t2 - t1} ms`);
            console.log('-----------------------')
            return resultado;
        }

        return descriptor;
    }
}   