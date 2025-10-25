import GestionAlquiler from "../src/gestionAlquiler";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/reserva";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import Disponibilidad from "../src/disponibilidad";
import Sedan from "../src/sedan";

jest.mock("../src/disponibilidad");

describe("GestionAlquiler", () => {
  let gestion: GestionAlquiler;
  let vehiculo: Vehiculo;
  let reserva: Reserva;

  beforeEach(() => {
    gestion = new GestionAlquiler();
    vehiculo = new Sedan(123, "Sedan", 10000, EstadoVehiculo.DISPONIBLE);
    reserva = new Reserva(vehiculo, "2025-10-10", "2025-10-15");
    gestion.getVehiculos().set(vehiculo.getNumMatricula(), vehiculo);
  });

  test("debería procesar correctamente una reserva válida", () => {
    (Disponibilidad as jest.Mock).mockImplementation(() => ({
      estaDisponible: jest.fn().mockReturnValue(true),
    }));

    const resultado = gestion.procesarReserva(reserva);
    expect(resultado).toBe(true);
  });

  test("debería lanzar error si el vehículo no existe", () => {
    const gestion2 = new GestionAlquiler();
    expect(() => gestion2.procesarReserva(reserva)).toThrow("Vehiculo no encontrado.");
  });

  test("debería lanzar error si el vehículo no está disponible", () => {
    vehiculo.setEstadoEnAlquiler();
    expect(() => gestion.procesarReserva(reserva)).toThrow("El vehiculo no esta disponible.");
  });

  test("debería agregar una reserva al entregarVehiculo()", () => {
    gestion.entregarVehiculo(reserva);
    const reservas = gestion.getReservas().get(vehiculo.getNumMatricula());
    expect(reservas?.length).toBe(1);
    expect(reservas?.[0]).toBe(reserva);
  });

  test("debería marcar el vehículo como disponible al recibirlo", () => {
    reserva.calcularPrecioReserva = jest.fn().mockReturnValue(1500);

    gestion.recibirVehiculo(reserva);

    const vehiculoGuardado = gestion.getVehiculos().get(vehiculo.getNumMatricula());
    expect(vehiculoGuardado?.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(reserva.calcularPrecioReserva).toHaveBeenCalled();
  });
});
