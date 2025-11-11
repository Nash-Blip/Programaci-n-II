import { mock, MockProxy } from "jest-mock-extended";
import Administracion from "../src/administracion";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/Reserva";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import Disponibilidad from "../src/disponibilidad";
import DatosMantenimiento from "../src/datosMantenimiento";

jest.mock("../src/disponibilidad");
const DisponibilidadMock = Disponibilidad as jest.MockedClass<typeof Disponibilidad>;

describe("Administracion", () => {
  let admin: Administracion;
  let disponibilidadMock: MockProxy<Disponibilidad>;

  beforeEach(() => {
    DisponibilidadMock.mockClear();
    disponibilidadMock = mock<Disponibilidad>();
    DisponibilidadMock.mockImplementation(() => disponibilidadMock);
    admin = new Administracion();
  });

  test("procesarReserva lanza error si el vehículo no existe", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(1);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    expect(() => admin.procesarReserva(reservaMock)).toThrow("Vehiculo no encontrado.");
  });

  test("procesarReserva lanza error si el vehículo no está DISPONIBLE", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(2);
    vehiculoMock.getEstado.mockReturnValue(EstadoVehiculo.EN_ALQUILER);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.getVehiculos().set(2, vehiculoMock);

    expect(() => admin.procesarReserva(reservaMock)).toThrow(
      "El vehiculo no esta disponible."
    );
  });

  test("procesarReserva marca mantenimiento y lanza error cuando necesitaMantenimiento es true", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(3);
    vehiculoMock.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.getVehiculos().set(3, vehiculoMock);
    disponibilidadMock.necesitaMantenimiento.mockReturnValue(true);

    expect(() => admin.procesarReserva(reservaMock)).toThrow(
      "El vehiculo solicitado se encuentra en mantenimiento."
    );

    expect(vehiculoMock.setEstadoEnMantenimiento).toHaveBeenCalledTimes(1);
    expect(disponibilidadMock.estaDisponible).not.toHaveBeenCalled();
  });

  test("procesarReserva llama a estaDisponible con reservas del vehículo cuando no requiere mantenimiento", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();
    const reservaExistente = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(4);
    vehiculoMock.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.getVehiculos().set(4, vehiculoMock);
    admin.getReservas().set(4, [reservaExistente]);

    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(true);

    admin.procesarReserva(reservaMock);

    expect(disponibilidadMock.estaDisponible).toHaveBeenCalledWith(
      reservaMock,
      [reservaExistente]
    );
  });

  test("procesarReserva retorna true cuando estaDisponible es true", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(5);
    vehiculoMock.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.getVehiculos().set(5, vehiculoMock);
    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(true);

    const resultado = admin.procesarReserva(reservaMock);

    expect(resultado).toBe(true);
  });

  test("procesarReserva retorna false cuando estaDisponible es false", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(6);
    vehiculoMock.getEstado.mockReturnValue(EstadoVehiculo.DISPONIBLE);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.getVehiculos().set(6, vehiculoMock);
    disponibilidadMock.necesitaMantenimiento.mockReturnValue(false);
    disponibilidadMock.estaDisponible.mockReturnValue(false);

    const resultado = admin.procesarReserva(reservaMock);

    expect(resultado).toBe(false);
  });

  test("entregarVehiculo cambia el estado del vehículo a EN_ALQUILER", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(10);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.entregarVehiculo(reservaMock);

    expect(vehiculoMock.setEstadoEnAlquiler).toHaveBeenCalledTimes(1);
  });

  test("entregarVehiculo agrega la reserva al mapa de reservas", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(11);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.entregarVehiculo(reservaMock);

    const reservasDelVehiculo = admin.getReservas().get(11);
    expect(reservasDelVehiculo).toBeDefined();
    expect(reservasDelVehiculo && reservasDelVehiculo[0]).toBe(reservaMock);
  });

  test("entregarVehiculo actualiza el mapa de vehículos con el vehículo de la reserva", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();

    vehiculoMock.getNumMatricula.mockReturnValue(12);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);

    admin.entregarVehiculo(reservaMock);

    expect(admin.getVehiculos().get(12)).toBe(vehiculoMock);
  });

  test("recibirVehiculo marca el vehículo como DISPONIBLE", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();
    const datosMantenimiento = new DatosMantenimiento(0, new Date(), 0);

    vehiculoMock.getNumMatricula.mockReturnValue(20);
    vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantenimiento);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);
    reservaMock.calcularPrecioReserva.mockReturnValue(1000);

    admin.getVehiculos().set(20, vehiculoMock);

    admin.recibirVehiculo(reservaMock);

    expect(vehiculoMock.setEstadoDisponible).toHaveBeenCalledTimes(1);
  });

  test("recibirVehiculo incrementa alquileresCantidad en DatosMantenimiento", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();
    const datosMantenimiento = new DatosMantenimiento(0, new Date(), 3);

    vehiculoMock.getNumMatricula.mockReturnValue(21);
    vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantenimiento);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);
    reservaMock.calcularPrecioReserva.mockReturnValue(500);

    admin.getVehiculos().set(21, vehiculoMock);

    admin.recibirVehiculo(reservaMock);

    expect(datosMantenimiento.getAlquileresCantidad()).toBe(4);
  });

  test("recibirVehiculo actualiza el mapa de vehículos con el vehículo recibido", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();
    const datosMantenimiento = new DatosMantenimiento(0, new Date(), 1);

    vehiculoMock.getNumMatricula.mockReturnValue(22);
    vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantenimiento);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);
    reservaMock.calcularPrecioReserva.mockReturnValue(800);

    admin.getVehiculos().set(22, vehiculoMock);

    admin.recibirVehiculo(reservaMock);

    expect(admin.getVehiculos().get(22)).toBe(vehiculoMock);
  });

  test("recibirVehiculo devuelve el precio calculado de la reserva", () => {
    const vehiculoMock = mock<Vehiculo>();
    const reservaMock = mock<Reserva>();
    const datosMantenimiento = new DatosMantenimiento(0, new Date(), 0);

    vehiculoMock.getNumMatricula.mockReturnValue(23);
    vehiculoMock.getDatosMantenimiento.mockReturnValue(datosMantenimiento);
    reservaMock.getVehiculo.mockReturnValue(vehiculoMock);
    reservaMock.calcularPrecioReserva.mockReturnValue(1234);

    admin.getVehiculos().set(23, vehiculoMock);

    const precio = admin.recibirVehiculo(reservaMock);

    expect(precio).toBe(1234);
  });
});
