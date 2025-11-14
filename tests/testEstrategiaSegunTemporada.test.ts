import EstrategiaSegunTemporada from "../src/EstrategiaSegunTemporada";
import EstrategiaTemporadaAlta from "../src/EstrategiaTemporadaAlta";
import EstrategiaTemporadaBaja from "../src/EstrategiaTemporadaBaja";
import EstrategiaTemporadaMedia from "../src/EstrategiaTemporadaMedia";
import { Temporada } from "../src/Temporada";

describe('tests calcular temporada', () => {
    let mockFecha: Date;
    let mockTarifaBase: number;
    let setEstrategia: EstrategiaSegunTemporada

    beforeEach(() => {
        setEstrategia = new EstrategiaSegunTemporada()
        mockTarifaBase = 50;
    })

    test('test metodo tarifaBaseTemporada: temporada baja', () => {
        mockFecha = new Date(2025, 5, 11);
        const resultado = setEstrategia.setEstrategiaTemporada(mockFecha)

        expect(resultado).toBeInstanceOf(EstrategiaTemporadaBaja)
    })
    test('test metodo tarifaBaseTemporada: temporada alta', () => {
        mockFecha = new Date(2020, 11, 5);
        const resultado = setEstrategia.setEstrategiaTemporada(mockFecha)

        expect(resultado).toBeInstanceOf(EstrategiaTemporadaAlta)
    })
    test('test metodo tarifaBaseTemporada: temporada media', () => {
        mockFecha = new Date(2016, 4, 1);
        const resultado = setEstrategia.setEstrategiaTemporada(mockFecha)

        expect(resultado).toBeInstanceOf(EstrategiaTemporadaMedia)
    })
})