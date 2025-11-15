import { EstrategiaTemporada } from "../src/EstrategiaTemporada"
import EstrategiaTemporadaAlta from "../src/EstrategiaTemporadaAlta"
import EstrategiaTemporadaBaja from "../src/EstrategiaTemporadaBaja";
import EstrategiaTemporadaMedia from "../src/EstrategiaTemporadaMedia";

describe('tests de las clases EstrategiaTemporada', () =>{
    let estrategiaTemporadaAlta: EstrategiaTemporada;
    let estrategiaTemporadaBaja: EstrategiaTemporada;
    let estrategiaTemporadaMedia: EstrategiaTemporada;
    let mockTarifaBase: number;

    beforeEach(() => {
        estrategiaTemporadaAlta = new EstrategiaTemporadaAlta();
        estrategiaTemporadaBaja = new EstrategiaTemporadaBaja();
        estrategiaTemporadaMedia = new EstrategiaTemporadaMedia();

        mockTarifaBase = 50
    })

    test('Clase EstrategiaTemporadaAlta: metodo tarifaBaseTemporada()', () =>{
        const totalTarifa = estrategiaTemporadaAlta.tarifaBaseTemporada(mockTarifaBase);
        const numeroEsperado = mockTarifaBase * 1.2;

        expect(totalTarifa).toBe(numeroEsperado);
    })

    test('Clase EstrategiaTemporadaBaja: metodo tarifaBaseTemporada()', () =>{
        const totalTarifa = estrategiaTemporadaBaja.tarifaBaseTemporada(mockTarifaBase);
        const numeroEsperado = mockTarifaBase * 0.9;

        expect(totalTarifa).toBe(numeroEsperado);
    })

    test('Clase EstrategiaTemporadaMedia: metodo tarifaBaseTemporada()', () =>{
        const totalTarifa = estrategiaTemporadaMedia.tarifaBaseTemporada(mockTarifaBase);
        const numeroEsperado = mockTarifaBase

        expect(totalTarifa).toBe(numeroEsperado);
    })
})