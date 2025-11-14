import Administracion from "../src/administracion";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/Reserva";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import Disponibilidad from "../src/disponibilidad";
import DatosMantenimiento from "../src/datosMantenimiento";
import Mantenimiento from "../src/mantenimiento";
import Estadistica from "../src/estadistica";

jest.mock("../src/disponibilidad");
jest.mock("../src/mantenimiento");
jest.mock("../src/estadistica");

const DisponibilidadMock = Disponibilidad as jest.MockedClass<typeof Disponibilidad>;
const MantenimientoMock = Mantenimiento as jest.MockedClass<typeof Mantenimiento>;
const EstadisticaMock = Estadistica as jest.MockedClass<typeof Estadistica>;

type DisponibilidadInstanciaMock = {
  necesitaMantenimiento: jest.Mock<boolean, [Reserva]>;
  estaDisponible: jest.Mock<boolean, [Reserva, Reserva[]]>;
};

const generarReporteMock = jest.fn<string, [Map<number, Vehiculo>]>();

// Mock simple de Estadistica: solo nos importa generarReporte
EstadisticaMock.mockImplementation(() => {
  return {
    generarReporte: generarReporteMock,
  } as unknown as Estadistica;
});

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
    marcarMantenimiento: jest.fn(),
  } as unknown as jest.Mocked<Reserva>;
}

describe("Administracion", () => {
  let admin: Administracion;
  let dispMock: DisponibilidadInstanciaMock;

  beforeEach(() => {
    jest.clearAllMocks();
    DisponibilidadMock.mockClear();
    MantenimientoMock.mockClear();
    EstadisticaMock.mockClear();
    generarReporteMock.mockClear();

    dispMock = {
      necesitaMantenimiento: jest.fn(),
      estaDisponible: jest.fn(),
    };

    DisponibilidadMock.mockImplementation(
      () => dispMock as unknown as Disponibilidad
    );

    admin = new Administracion();
  });

  // ----------- procesarReserva -----------

  test("procesarReserva lanza error si el vehículo no existe", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    vehiculo.getNumMatricula.mockReturnValue(1);

    expect(() => admin.procesarReserva(reserva)).toThrow("Vehiculo no encontrado");
  });

  test("procesarReserva lanza error si el vehículo está en mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    vehiculo.getNumMatricula.mockReturnValue(2);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.EN_MANTENIMIENTO);
    admin.getVehiculos().set(2, vehiculo);

    expect(() => admin.procesarReserva(reserva)).toThrow(
      "El vehiculo esta en mantenimiento."
    );
    expect(dispMock.estaDisponible).not.toHaveBeenCalled();
  });

  test("procesarReserva lanza error si el vehículo no está DISPONIBLE", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    vehiculo.getNumMatricula.mockReturnValue(3);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.EN_ALQUILER);
    admin.getVehiculos().set(3, vehiculo);

    expect(() => admin.procesarReserva(reserva)).toThrow(
      "El vehiculo no esta disponible."
    );
    expect(dispMock.estaDisponible).not.toHaveBeenCalled();
  });

  test("procesarReserva usa estaDisponible y devuelve su resultado", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    const reservaExistente = crearReservaMock(vehiculo);

    vehiculo.getNumMatricula.mockReturnValue(4);
    vehiculo.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);
    admin.getVehiculos().set(4, vehiculo);
    admin.getReservas().set(4, [reservaExistente]);

    dispMock.estaDisponible.mockReturnValueOnce(true);
    const resultadoTrue = admin.procesarReserva(reserva);
    expect(resultadoTrue).toBe(true);

    dispMock.estaDisponible.mockReturnValueOnce(false);
    const resultadoFalse = admin.procesarReserva(reserva);
    expect(resultadoFalse).toBe(false);

    expect(dispMock.estaDisponible).toHaveBeenCalledWith(
      reserva,
      [reservaExistente]
    );
  });

  // ----------- entregarVehiculo -----------

  test("entregarVehiculo cambia estado, suma estadística y registra reserva y vehículo", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);
    vehiculo.getNumMatricula.mockReturnValue(10);

    admin.entregarVehiculo(reserva);

    expect(vehiculo.setEstadoEnAlquiler).toHaveBeenCalledTimes(1);
    expect(
      vehiculo.getDatosEstadistica().aumentarCantidadDeVecesAlquilado
    ).toHaveBeenCalledTimes(1);

    const reservasDelVehiculo = admin.getReservas().get(10);
    expect(reservasDelVehiculo && reservasDelVehiculo[0]).toBe(reserva);
    expect(admin.getVehiculos().get(10)).toBe(vehiculo);
  });

  // ----------- recibirVehiculo -----------

  test("recibirVehiculo aumenta alquileres y deja DISPONIBLE cuando no necesita mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    const datosMant = {
      aumentarCantidadAlquileres: jest.fn(),
    } as unknown as DatosMantenimiento;

    vehiculo.getNumMatricula.mockReturnValue(20);
    vehiculo.getDatosMantenimiento.mockReturnValue(datosMant);
    dispMock.necesitaMantenimiento.mockReturnValue(false);

    admin.recibirVehiculo(reserva);

    expect(datosMant.aumentarCantidadAlquileres).toHaveBeenCalledTimes(1);
    expect(vehiculo.setEstadoDisponible).toHaveBeenCalledTimes(1);
    expect(MantenimientoMock).not.toHaveBeenCalled();
    expect(reserva.marcarMantenimiento).not.toHaveBeenCalled();
    expect(admin.getVehiculos().get(20)).toBe(vehiculo);
  });

  test("recibirVehiculo crea Mantenimiento y marca la reserva cuando necesita mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const reserva = crearReservaMock(vehiculo);

    const datosMant = {
      aumentarCantidadAlquileres: jest.fn(),
    } as unknown as DatosMantenimiento;

    vehiculo.getNumMatricula.mockReturnValue(21);
    vehiculo.getDatosMantenimiento.mockReturnValue(datosMant);
    dispMock.necesitaMantenimiento.mockReturnValue(true);

    admin.recibirVehiculo(reserva);

    expect(datosMant.aumentarCantidadAlquileres).toHaveBeenCalledTimes(1);
    expect(MantenimientoMock).toHaveBeenCalledTimes(1);
    expect(MantenimientoMock).toHaveBeenCalledWith(vehiculo);
    expect(vehiculo.setEstadoDisponible).not.toHaveBeenCalled();
    expect(reserva.marcarMantenimiento).toHaveBeenCalledTimes(1);
    expect(admin.getVehiculos().get(21)).toBe(vehiculo);
  });

  // ----------- recibirReporte -----------

  test("recibirReporte delega en Estadistica y devuelve su resultado", () => {
    const reporteEsperado = "REPORTE DE PRUEBA";
    generarReporteMock.mockReturnValue(reporteEsperado);

    const resultado = admin.recibirReporte();

    expect(generarReporteMock).toHaveBeenCalledTimes(1);
    expect(generarReporteMock).toHaveBeenCalledWith(admin.getVehiculos());
    expect(resultado).toBe(reporteEsperado);
  });
});