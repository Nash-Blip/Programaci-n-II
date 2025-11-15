const disponibilidadMock = {
    necesitaMantenimiento: jest.fn(() => true)
};

jest.mock("../src/disponibilidad", () => {
    return jest.fn().mockImplementation(() => disponibilidadMock);
});

import Facturacion from "../src/facturacion";
import { Tarifa } from "../src/Tarifa";

describe("Facturacion", () => {

    test("calcula el monto final SIN mantenimiento", () => {
    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);

    const tarifaMock = {
        calcularTarifa: jest.fn().mockReturnValue(10000),
    };

    const vehiculoMock = {
        getLogicaTarifa: jest.fn(() => tarifaMock),
    };

    const reservaMock = {
        getVehiculo: () => vehiculoMock,
    };

    const fact = new Facturacion();
    const total = fact.calcularMontoFinal(reservaMock as any);

    expect(total).toBe(10000);
});

    test("calcula el monto final con mantenimiento", () => {

        disponibilidadMock.necesitaMantenimiento.mockReturnValue(true);

        const tarifaMock: Tarifa = {
            calcularTarifa: jest.fn().mockReturnValue(10000),

            calcularKm: {
                calcularKmTotales: jest.fn(),
                promedioKmDiarios: jest.fn(),
            } as any,

            seteadorEstrategia: {
                setEstrategiaTemporada: jest.fn(),
                getEstrategiaActual: jest.fn(),
            } as any
        };

        const vehiculoMock = {
            getLogicaTarifa: jest.fn(() => tarifaMock),
        };

        const reservaMock = {
            getVehiculo: () => vehiculoMock,
        };

        const fact = new Facturacion();
        const total = fact.calcularMontoFinal(reservaMock as any);

        expect(total).toBe(15000); 
        expect(disponibilidadMock.necesitaMantenimiento).toHaveBeenCalled();
    });

});