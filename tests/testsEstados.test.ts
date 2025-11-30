import EstadoDisponible from "../src/EstadoDisponible";
import EstadoEnAlquiler from "../src/EstadoEnAlquiler";
import EstadoMantenimiento from "../src/EstadoMantenimiento";


function crearVehiculoMock() {
    return {
        setEstado: jest.fn(),
        getKilometro: jest.fn(),
        getDatosMantenimiento: jest.fn(),
        getDatosEstadistica: jest.fn(),
        alquilar: jest.fn()
    };
}

function crearDatosMantMock() {
    return {
        getKmUltimoMant: jest.fn(),
        getFechaUltimoMant: jest.fn(),
        getAlquileresCantidad: jest.fn(),
        aumentarCantidadAlquileres: jest.fn(),
        aumentarKmUltimoMant: jest.fn(),
        reiniciarDatos: jest.fn(),
    };
}

function crearDatosEstadisticaMock() {
    return {
        aumentarCostosMantenimiento: jest.fn()
    };
}


describe("EstadoDisponible", () => {

    let vehiculoMock: any;

    beforeEach(() => {
        vehiculoMock = crearVehiculoMock();
    });

    test("alquilar() cambia a EstadoEnAlquiler y devuelve true", () => {
        const estado = new EstadoDisponible(vehiculoMock);

        const result = estado.alquilar();

        expect(result).toBe(true);
        expect(vehiculoMock.setEstado).toHaveBeenCalled();
        expect(vehiculoMock.setEstado.mock.calls[0][0]).toBeInstanceOf(EstadoEnAlquiler);
    });

    test("devolver() lanza error", () => {
        const estado = new EstadoDisponible(vehiculoMock);

        expect(() => estado.devolver()).toThrow(
            "El vehiculo esta disponible: operacion sin sentido"
        );
    });

});


describe("EstadoEnAlquiler", () => {

    let vehiculoMock: any;
    let datosMantMock: any;

    beforeEach(() => {
        datosMantMock = crearDatosMantMock();

        vehiculoMock = crearVehiculoMock();
        vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantMock);
        vehiculoMock.getKilometro.mockReturnValue(100);
    });

    test("alquilar() lanza error porque ya está alquilado", () => {
        const estado = new EstadoEnAlquiler(vehiculoMock);

        expect(() => estado.alquilar()).toThrow(
            "El vehiculo ya se encuentra alquilado, no es posible su reserva"
        );
    });

    test("devolver() → pasa a EstadoDisponible si NO necesita mantenimiento", () => {
        datosMantMock.getKmUltimoMant.mockReturnValue(5000);
        datosMantMock.getFechaUltimoMant.mockReturnValue(5);
        datosMantMock.getAlquileresCantidad.mockReturnValue(2);

        const estado = new EstadoEnAlquiler(vehiculoMock);

        estado.devolver();

        expect(vehiculoMock.setEstado).toHaveBeenCalled();
        expect(vehiculoMock.setEstado.mock.calls[0][0]).toBeInstanceOf(EstadoDisponible);

        expect(datosMantMock.aumentarCantidadAlquileres).toHaveBeenCalled();
        expect(datosMantMock.aumentarKmUltimoMant).toHaveBeenCalled();
    });

    test("devolver() → pasa a EstadoMantenimiento si requiere mantenimiento", () => {
        datosMantMock.getKmUltimoMant.mockReturnValue(15000);
        datosMantMock.getFechaUltimoMant.mockReturnValue(13);
        datosMantMock.getAlquileresCantidad.mockReturnValue(7);

        const estado = new EstadoEnAlquiler(vehiculoMock);

        estado.devolver();

        expect(vehiculoMock.setEstado).toHaveBeenCalled();
        expect(vehiculoMock.setEstado.mock.calls[0][0]).toBeInstanceOf(EstadoMantenimiento);
    });

});


describe("EstadoMantenimiento", () => {

    let vehiculoMock: any;
    let datosMantMock: any;
    let datosEstadisticaMock: any;

    beforeEach(() => {
        datosMantMock = crearDatosMantMock();
        datosEstadisticaMock = crearDatosEstadisticaMock();

        vehiculoMock = crearVehiculoMock();
        vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantMock);
        vehiculoMock.getDatosEstadistica.mockReturnValue(datosEstadisticaMock);
        vehiculoMock.alquilar.mockReturnValue(true);
    });

    test("alquilar() antes de 24h lanza error", () => {
        jest.useFakeTimers().setSystemTime(new Date("2025-01-01T00:00:00Z"));

        const estado = new EstadoMantenimiento(vehiculoMock);

        jest.setSystemTime(new Date("2025-01-01T10:00:00Z"));

        expect(() => estado.alquilar()).toThrow(
            "El vehiculo se encuentra en mantenimiento no puede ser alquilado"
        );

        jest.useRealTimers();
    });

test("alquilar() después de 24h reinicia datos, suma costo y pasa a EstadoDisponible", () => {
    // 1) Congelar el tiempo en el inicio
    jest.useFakeTimers({ now: new Date("2025-01-01T00:00:00Z") });

    const estado = new EstadoMantenimiento(vehiculoMock);

    // 2) Avanzar 30 horas
    jest.setSystemTime(new Date("2025-01-02T06:00:00Z"));

    const result = estado.alquilar();

    expect(datosMantMock.reiniciarDatos).toHaveBeenCalled();
    expect(datosEstadisticaMock.aumentarCostosMantenimiento).toHaveBeenCalledWith(5000);

    expect(vehiculoMock.setEstado).toHaveBeenCalled();
    expect(vehiculoMock.setEstado.mock.calls[0][0]).toBeInstanceOf(EstadoEnAlquiler);

    expect(result).toBe(true);

    jest.useRealTimers();
});

    test("devolver() lanza error", () => {
        const estado = new EstadoMantenimiento(vehiculoMock);

        expect(() => estado.devolver()).toThrow(
            "El vehiculo esta en mantenimiento: operacion sin sentido"
        );
    });

});