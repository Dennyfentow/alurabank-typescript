export abstract class View<T> {
    private _elemento: JQuery;
    private _escapar: boolean; // valor padrão, undefined(falso)

    constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    update(model: T) {
        let template: string = this.template(model);
        // método para caso haja falha de segurança e o template receba algum script indevido!
        if(this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        } 

        this._elemento.html(template);
    }

    abstract template(model: T): string;
}
