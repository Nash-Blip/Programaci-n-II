import DatosEstadistica from "../src/DatosEstadistica";

describe('tests de la clase datos estadistica', () =>{
    let cantidadDeVecesAlquilado: number;
    let ingresosAlquiler: number;
    let costosMantenimiento: number;
    let datosEstadistica: DatosEstadistica

    beforeEach(() => {
        datosEstadistica = new DatosEstadistica()

    })

    test('test metodo aumentarCantidadDeVecesAlquilada()', () =>{
        datosEstadistica.aumentarCantidadDeVecesAlquilado();
        const resultado = datosEstadistica.getCantidadDeVecesAlquilado();
        expect(resultado).toBe(1)
    })
    test('test metodo getCantidadDeVecesAlquilado()', () =>{
        const resultado = datosEstadistica.getCantidadDeVecesAlquilado();

        expect(typeof resultado).toBe('number')
        expect(resultado).toBe(0)
    })

    test('test metodo aumentarIngresosAlquiler()', () =>{
        datosEstadistica.aumentarIngresosAlquiler(500);
        const resultado = datosEstadistica.getIngresosAlquiler();

        expect(resultado).toBe(500)
    })

    test('test metodo getIngresosAlquiler', () =>{
        const resultado = datosEstadistica.getIngresosAlquiler();

        expect(typeof resultado).toBe('number')
        expect(resultado).toBe(0)
    })

    test('test metodo aumentarCostosMantenimiento()', () =>{
        datosEstadistica.aumentarCostosMantenimiento(1500);
        const resultado = datosEstadistica.getCostosMantenimiento()

        expect(resultado).toBe(1500)
    })

    test('test metodo getCostosMantenimiento()', () =>{
        const resultado = datosEstadistica.getCostosMantenimiento();

        expect(typeof resultado).toBe('number')
        expect(resultado).toBe(0)
    })

    test('test metodo calcularRentabilidad()', () =>{
        datosEstadistica.aumentarIngresosAlquiler(1000);
        datosEstadistica.aumentarCostosMantenimiento(350)
        const resultado = datosEstadistica.calcularRentabilidad();

        expect(resultado).toBe(650)
    })
})