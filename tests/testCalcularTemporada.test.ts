import CalcularTemporada from "../src/CalcularTemporada";
import { Temporada } from "../src/Temporada";

describe('tests calcular temporada', () => {
    let mockFecha: Date;
    let mockTarifaBase: number;
    let calculadoraTemporada: CalcularTemporada

    beforeEach(() => {
        calculadoraTemporada = new CalcularTemporada();
        mockTarifaBase = 50;
    })

    test('test metodo tarifaBaseTemporada: temporada baja', () => {
        mockFecha = new Date(2025, 5, 11);
        const resultado = calculadoraTemporada.tarifaBaseTemporada(mockTarifaBase, mockFecha)

        expect(resultado).toBe(45);
    })
    test('test metodo tarifaBaseTemporada: temporada alta', () => {
        mockFecha = new Date(2020, 11, 5);
        const resultado = calculadoraTemporada.tarifaBaseTemporada(mockTarifaBase, mockFecha);

        expect(resultado).toBe(60)
    })
    test('test metodo tarifaBaseTemporada: temporada media', () => {
        mockFecha = new Date(2016, 4, 1);
        const resultado = calculadoraTemporada.tarifaBaseTemporada(mockTarifaBase, mockFecha);

        expect(resultado).toBe(50)
    })
})