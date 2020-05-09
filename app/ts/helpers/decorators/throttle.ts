export function throttle(milissegundos: number = 0) {
    
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        let timer = 0;
        
        descriptor.value = function(...args: any[]) { 
            if(event) event.preventDefault();
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
            // Não tem retorno por que o método é do tipo void
        }

        return descriptor;

    }
}