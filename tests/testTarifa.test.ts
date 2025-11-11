import TarifaCompacto from "../src/TarifaCompacto";
import TarifaSedan from "../src/TarifaSedan";
import TarifaSuv from "../src/TarifaSuv";

describe('Test clase TarifaCompacto', () => {
    let tarifaCompacto: TarifaCompacto;
    let tarifaSedan: TarifaSedan;
    let tarifaSuv: TarifaSuv;
    let mockCalcularKm: any;
    let mockReserva: any;
    let mockCalcularTemporada: any;

    beforeEach(() => {
    tarifaCompacto = new TarifaCompacto();
    tarifaSedan = new TarifaSedan();
    tarifaSuv = new TarifaSuv()

    mockCalcularKm = {
      promedioKmDiarios: jest.fn(),
      calcularKmTotales: jest.fn()
    };

    mockReserva = {
      calcularCantidadDias: jest.fn(),
      getKmIniciales: jest.fn(),
      getKmFinales: jest.fn(),
      getFechaInicio: jest.fn(),
      calculadoraKilometros: mockCalcularKm
    };

    mockCalcularTemporada = {
      tarifaBaseTemporada: jest.fn(),
    };

    tarifaCompacto.calcularKm = mockCalcularKm;
    tarifaCompacto.calcularTemporada = mockCalcularTemporada;
    tarifaSedan.calcularKm = mockCalcularKm;
    tarifaSedan.calcularTemporada = mockCalcularTemporada;
    tarifaSuv.calcularKm = mockCalcularKm;
    tarifaSuv.calcularTemporada = mockCalcularTemporada;
    });

    test('Test clase TarifaCompacto: metodo calcularTarifa promedio de kilómetros < 100 → no se aplica cargo adicional', () => {
        mockCalcularKm.promedioKmDiarios.mockReturnValue(99);
        mockReserva.calcularCantidadDias.mockReturnValue(2);
        mockCalcularTemporada.tarifaBaseTemporada.mockReturnValue(30);

        const total = tarifaCompacto.calcularTarifa(mockReserva);

        expect(total).toBe(60);
    });

    test('Test clase TarifaCompacto: metodo calcularTarifa promedio de kilómetros ≥ 100 → se aplica cargo adicional', () => {
        mockCalcularKm.promedioKmDiarios.mockReturnValue(300);
        mockReserva.calcularCantidadDias.mockReturnValue(2);
        mockCalcularKm.calcularKmTotales.mockReturnValue(400);
        mockReserva.getKmIniciales.mockReturnValue(1000);
        mockReserva.getKmFinales.mockReturnValue(1400);
        mockCalcularTemporada.tarifaBaseTemporada.mockReturnValue(30);

        const total = tarifaCompacto.calcularTarifa(mockReserva);

        expect(total).toBe(120);
    });

    test('Test clase TarifaSedan: metodo calcularTarifa', () => {
        mockReserva.calcularCantidadDias.mockReturnValue(10);
        mockCalcularKm.calcularKmTotales.mockReturnValue(100);
        mockReserva.getKmIniciales.mockReturnValue(500);
        mockReserva.getKmFinales.mockReturnValue(600);
        mockCalcularTemporada.tarifaBaseTemporada.mockReturnValue(50);

        const total = tarifaSedan.calcularTarifa(mockReserva);
        expect(total).toBe(520);
    });

    test('Test clase TarifaSuv: metodo calcularTarifa total km <= 500 → no se aplica cargo adicional', () => {
        mockReserva.calcularCantidadDias.mockReturnValue(2);
        mockCalcularKm.calcularKmTotales.mockReturnValue(50);
        mockReserva.getKmIniciales.mockReturnValue(1100);
        mockReserva.getKmFinales.mockReturnValue(1150);
        mockCalcularTemporada.tarifaBaseTemporada.mockReturnValue(80);

        const total = tarifaSuv.calcularTarifa(mockReserva);
        expect(total).toBe(190)
    });

    test('Test clase TarifaSuv: metodo calcularTarifa total km > 500 → se aplica cargo adicional', () => {
        mockReserva.calcularCantidadDias.mockReturnValue(8);
        mockCalcularKm.calcularKmTotales.mockReturnValue(1200);
        mockReserva.getKmIniciales.mockReturnValue(500);
        mockReserva.getKmFinales.mockReturnValue(1700);
        mockCalcularTemporada.tarifaBaseTemporada.mockReturnValue(80);

        const total = tarifaSuv.calcularTarifa(mockReserva);
        expect(total).toBe(1060);
    });

})