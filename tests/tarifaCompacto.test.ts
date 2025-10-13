import TarifaCompacto from "../src/TarifaCompacto";

describe('Test clase TarifaCompacto', () => {
    let tarifa: TarifaCompacto;
    let mockCalcularKm: any;
    let mockReserva: any;

    beforeEach(() => {
    tarifa = new TarifaCompacto();

    mockCalcularKm = {
      promedioKmDiarios: jest.fn(),
      calcularKmTotales: jest.fn()
    };

    mockReserva = {
      calcularCantidadDias: jest.fn(),
      getKmIniciales: jest.fn(),
      getKmFinales: jest.fn(),
      calculadoraKilometros: mockCalcularKm
    };

    tarifa.calcularKm = mockCalcularKm;
    });

    test('Ejemplo de promedio de kilómetros < 100 → no se aplica cargo adicional', () => {
        mockCalcularKm.promedioKmDiarios.mockReturnValue(99);
        mockReserva.calcularCantidadDias.mockReturnValue(2);

        const total = tarifa.calcularTarifa(mockReserva);

        expect(total).toBe(60);
    });

    test('Ejemplo de promedio de kilómetros ≥ 100 → se aplica cargo adicional', () => {
        mockCalcularKm.promedioKmDiarios.mockReturnValue(300);
        mockReserva.calcularCantidadDias.mockReturnValue(2);
        mockCalcularKm.calcularKmTotales.mockReturnValue(400);
        mockReserva.getKmIniciales.mockReturnValue(1000);
        mockReserva.getKmFinales.mockReturnValue(1400);

        const total = tarifa.calcularTarifa(mockReserva);

        expect(total).toBe(120);
    });

})