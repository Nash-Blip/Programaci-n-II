import Administracion from "../src/administracion";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/Reserva";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import Disponibilidad from "../src/disponibilidad";
import DatosMantenimiento from "../src/datosMantenimiento";

jest.mock("../src/disponibilidad");

const DisponibilidadMock = Disponibilidad as jest.MockedClass<typeof Disponibilidad>;
const generarReporteMock = jest.fn();

jest.mock("../src/estadistica", () => ({
  __esModule: true,
  default: class Estadistica {
    constructor(_: Map<number, any>) {}
    public generarReporte = generarReporteMock;
  },
}));

function crearVehiculoMock(): jest.Mocked<Vehiculo> {
  const datosEstadistica = {
    aumentarCantidadDeVecesAlquilado: jest.fn(),
  };

  return {
    getNumMatricula: jest.fn(),
    getEstado: jest.fn(),
    setEstadoEnMantenimiento: jest.fn(),
    setEstadoEnAlquiler: jest.fn(),
    setEstadoDisponible: jest.fn(),
    getDatosMantenimiento: jest.fn(),
    getDatosEstadistica: jest.fn(() => datosEstadistica),
  } as unknown as jest.Mocked<Vehiculo>;
}

function crearReservaMock(vehiculo: jest.Mocked<Vehiculo>): jest.Mocked<Reserva> {
  return {
    getVehiculo: jest.fn().mockReturnValue(vehiculo),
    calcularPrecioReserva: jest.fn(),
  } as unknown as jest.Mocked<Reserva>;
}

describe("Administracion", () => {
  let admin: Administracion;
  let disponibilidadMock: {
    necesitaMantenimiento: jest.Mock<boolean, [Reserva]>;
    estaDisponible: jest.Mock<boolean, [Reserva, Reserva[]]>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    DisponibilidadMock.mockClear();

    disponibilidadMock = {
      necesitaMantenimiento: jest.fn(),
      estaDisponible: jest.fn(),
    };
    DisponibilidadMock.mockImplementation(() => disponibilidadMock as unknown as Disponibilidad);

    admin = new Administracion();
  });

  // ----------- procesarReserva -----------

  test("procesarReserva lanza error si el vehículo no existe", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(1);

    expect(() => admin.procesarReserva(reserva)).toThrow("Vehiculo no encontrado.");
  });

  test("procesarReserva lanza error si el vehículo no está DISPONIBLE", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(2);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.EN_ALQUILER);

    admin.getVehiculos().set(2, vehiculo);

    expect(() => admin.procesarReserva(reserva)).toThrow(
      "El vehiculo no esta disponible."
    );
  });

  test("procesarReserva marca mantenimiento y lanza error cuando necesitaMantenimiento es true", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(3);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);

    admin.getVehiculos().set(3, vehiculo);
    disponibilidadMock.necesitaMantenimiento.mockReturnValue(true);

    expect(() => admin.procesarReserva(reserva)).toThrow(
      "El vehiculo solicitado se encuentra en mantenimiento."
    );

    expect(vehiculo.setEstadoEnMantenimiento).toHaveBeenCalledTimes(1);
    expect(disponibilidadMock.estaDisponible).not.toHaveBeenCalled();
  });

  test("procesarReserva llama a estaDisponible con reservas del vehículo cuando no requiere mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    const reservaExistente = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(4);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);

    admin.getVehiculos().set(4, vehiculo);
    admin.getReservas().set(4, [reservaExistente]);

    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(true);

    admin.procesarReserva(reserva);

    expect(disponibilidadMock.estaDisponible).toHaveBeenCalledWith(
      reserva,
      [reservaExistente]
    );
  });

  test("procesarReserva retorna true cuando estaDisponible es true", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(5);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);

    admin.getVehiculos().set(5, vehiculo);

    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(true);

    const resultado = admin.procesarReserva(reserva);

    expect(resultado).toBe(true);
  });

  test("procesarReserva retorna false cuando estaDisponible es false", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(6);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);

    admin.getVehiculos().set(6, vehiculo);

    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(false);

    const resultado = admin.procesarReserva(reserva);

    expect(disponibilidadMock.estaDisponible).toHaveBeenCalled();
    expect(resultado).toBe(false);
  });

  // ----------- entregarVehiculo -----------

  test("entregarVehiculo cambia el estado del vehículo a EN_ALQUILER", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(10);

    admin.entregarVehiculo(reserva);

    expect(vehiculo.setEstadoEnAlquiler).toHaveBeenCalledTimes(1);
  });

  test("entregarVehiculo incrementa la estadística de veces alquilado", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(100);

    admin.entregarVehiculo(reserva);

    expect(
      vehiculo.getDatosEstadistica().aumentarCantidadDeVecesAlquilado
    ).toHaveBeenCalledTimes(1);
  });

  test("entregarVehiculo agrega la reserva al mapa de reservas", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(11);

    admin.entregarVehiculo(reserva);

    const reservasDelVehiculo = admin.getReservas().get(11);
    expect(reservasDelVehiculo).toBeDefined();
    expect(reservasDelVehiculo && reservasDelVehiculo[0]).toBe(reserva);
  });

  test("entregarVehiculo actualiza el mapa de vehículos con el vehículo de la reserva", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(12);

    admin.entregarVehiculo(reserva);

    expect(admin.getVehiculos().get(12)).toBe(vehiculo);
  });

  // ----------- recibirVehiculo -----------

  test("recibirVehiculo marca el vehículo como DISPONIBLE", () => {
    const vehiculo = crearVehiculoMock();
    const datos = new DatosMantenimiento(0, new Date(), 0);
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(20);
    vehiculo.getDatosMantenimiento.mockReturnValue(datos);
    reserva.calcularPrecioReserva.mockReturnValue(1000);

    admin.getVehiculos().set(20, vehiculo);

    admin.recibirVehiculo(reserva);

    expect(vehiculo.setEstadoDisponible).toHaveBeenCalledTimes(1);
  });

  test("recibirVehiculo incrementa alquileresCantidad en DatosMantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const datos = new DatosMantenimiento(0, new Date(), 3);
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(21);
    vehiculo.getDatosMantenimiento.mockReturnValue(datos);
    reserva.calcularPrecioReserva.mockReturnValue(500);

    admin.getVehiculos().set(21, vehiculo);

    admin.recibirVehiculo(reserva);

    expect(datos.getAlquileresCantidad()).toBe(4);
  });

  test("recibirVehiculo actualiza el mapa de vehículos con el vehículo recibido", () => {
    const vehiculo = crearVehiculoMock();
    const datos = new DatosMantenimiento(0, new Date(), 1);
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(22);
    vehiculo.getDatosMantenimiento.mockReturnValue(datos);
    reserva.calcularPrecioReserva.mockReturnValue(800);

    admin.getVehiculos().set(22, vehiculo);

    admin.recibirVehiculo(reserva);

    expect(admin.getVehiculos().get(22)).toBe(vehiculo);
  });

  test("recibirVehiculo devuelve el precio calculado de la reserva", () => {
    const vehiculo = crearVehiculoMock();
    const datos = new DatosMantenimiento(0, new Date(), 0);
    const reserva = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(23);
    vehiculo.getDatosMantenimiento.mockReturnValue(datos);
    reserva.calcularPrecioReserva.mockReturnValue(1234);

    admin.getVehiculos().set(23, vehiculo);

    const precio = admin.recibirVehiculo(reserva);

    expect(precio).toBe(1234);
  });

  test("recibirReporte delega en Estadistica y devuelve su resultado", () => {
  const reporteEsperado = "REPORTE DE PRUEBA";

  generarReporteMock.mockReturnValue(reporteEsperado);

  const resultado = admin.recibirReporte();

  expect(generarReporteMock).toHaveBeenCalledTimes(1);
  expect(resultado).toBe(reporteEsperado);
});
});
