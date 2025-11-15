import Reserva from "../src/Reserva";
import CalcularKilometros from "../src/CalcularKilometros";

const mockTarifa = {
    calcularTarifa: jest.fn()
};

const mockVehiculo = {
    getLogicaTarifa: jest.fn(() => mockTarifa)
};

describe("Clase Reserva", () => {

    let reserva: Reserva;

    beforeEach(() => {
        jest.clearAllMocks();

        reserva = new Reserva(
            1,
            new Date("2024-10-01"),
            new Date("2024-10-05"),
            mockVehiculo as any,
            1000,
            1500,
            new CalcularKilometros()
        );
    });

    test("Debe calcular correctamente la cantidad de días", () => {
        const dias = reserva.calcularCantidadDias();
        expect(dias).toBe(4); 
    });

    test("Debe calcular correctamente el precio de la reserva usando la tarifa del vehículo", () => {
    
        mockTarifa.calcularTarifa.mockReturnValue(2000);

        const precio = reserva.calcularPrecioReserva();

        expect(mockTarifa.calcularTarifa).toHaveBeenCalledTimes(1);
        expect(mockTarifa.calcularTarifa).toHaveBeenCalledWith(reserva);
        expect(precio).toBe(2000);
    });

    test("Debe calcular correctamente los km totales mediante CalcularKilometros", () => {
        const verificarcalcularKm = jest.spyOn(CalcularKilometros.prototype, "calcularKmTotales");
        reserva.calcularPrecioReserva(); 
        expect(verificarcalcularKm).toHaveBeenCalledWith(1000, 1500);
    });

    test("Debe actualizar los km finales correctamente", () => {
        reserva.setKmFinales(1800);
        expect(reserva.getKmFinales()).toBe(1800);
    });

    test("Debe lanzar error si la fecha de inicio es posterior a la fecha de finalización", () => {

    const reservaInvalida = new Reserva(
        2,
        new Date("2024-10-10"),
        new Date("2024-10-05"),
        mockVehiculo as any,
        1000,
        1500,
        new CalcularKilometros()
    );

    expect(() => reservaInvalida.calcularCantidadDias())
        .toThrow("La fecha de inicio no puede ser posterior a la fecha de finalización");
});
});