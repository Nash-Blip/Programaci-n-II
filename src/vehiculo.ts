export abstract class Vehiculo{
    constructor(private numMatricula: number, private marcaAuto: string, private kilometro: number){}

    public setNumMatricula(value: number): void{
        this.numMatricula = value;
    }
    public getNumMatricula(): number{
        return this.numMatricula;
    }

    public setMarcaAuto(value: string): void{
        this.marcaAuto = value;
    }
    public getMarcaAuto(): string{
        return this.marcaAuto;
    }

    public setKilometro(value: number): void{
        this.kilometro = value;
    }
    public getKilometro(): number{
        return this.kilometro;
    }
}