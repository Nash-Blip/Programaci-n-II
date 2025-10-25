import GestionAlquiler from "../src/gestionAlquiler";
import Vehiculo from "../src/vehiculo";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import Sedan from "../src/sedan";

const estaDisponibleMock = jest.fn();
jest.mock("../src/disponibilidad", () => ({
  __esModule: true,
  default: class Disponibilidad {
    public estaDisponible = estaDisponibleMock;
  },
}));

const calcularPrecioReservaMock = jest.fn();
const getVehiculoMock = jest.fn();
jest.mock("../src/Reserva", () => {
  return {
    __esModule: true,
    default: class Reserva {
      constructor(
        public idReserva: number,
        public fechaInicio: Date,
        public fechaFinalizacion: Date,
        public vehiculo: any,
        public kmIniciales: number,
        public kmFinales: number
      ) {}
      calcularPrecioReserva = calcularPrecioReservaMock;
      getVehiculo = getVehiculoMock;
    },
  };
});

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);

describe("GestionAlquiler (mock de Reserva y Disponibilidad)", () => {
  let gestion: GestionAlquiler;
  let vehiculo: Vehiculo;
  let reserva: any;

  beforeEach(() => {
    estaDisponibleMock.mockReset();
    calcularPrecioReservaMock.mockReset();
    getVehiculoMock.mockReset();

    gestion = new GestionAlquiler();

    vehiculo = new Sedan(123, "Sedan", 10000, EstadoVehiculo.DISPONIBLE);

    const ReservaMock = jest.requireMock("../src/Reserva").default;
    reserva = new ReservaMock(1, d(2025, 10, 10), d(2025, 10, 15), vehiculo, 1000, 1200);

    getVehiculoMock.mockReturnValue(vehiculo);

    gestion.getVehiculos().set(vehiculo.getNumMatricula(), vehiculo);
  });

  test("procesarReserva → true cuando disponibilidad = true", () => {
    estaDisponibleMock.mockReturnValue(true);
    expect(gestion.procesarReserva(reserva)).toBe(true);
    expect(estaDisponibleMock).toHaveBeenCalled();
  });

  test("procesarReserva → lanza si vehículo no existe", () => {
    const g2 = new GestionAlquiler();
    estaDisponibleMock.mockReturnValue(true);
    expect(() => g2.procesarReserva(reserva)).toThrow("Vehiculo no encontrado.");
  });

  test("procesarReserva → lanza si vehículo no está disponible", () => {
    vehiculo.setEstadoEnAlquiler();
    expect(() => gestion.procesarReserva(reserva)).toThrow("El vehiculo no esta disponible.");
    expect(estaDisponibleMock).not.toHaveBeenCalled();
  });

  test("procesarReserva → false cuando disponibilidad = false", () => {
    estaDisponibleMock.mockReturnValue(false);
    expect(gestion.procesarReserva(reserva)).toBe(false);
  });

  test("entregarVehiculo → agrega reserva y cambia estado a EN_ALQUILER", () => {
    gestion.entregarVehiculo(reserva);

    const reservas = gestion.getReservas().get(vehiculo.getNumMatricula());
    expect(reservas?.length).toBe(1);
    expect(reservas?.[0]).toBe(reserva);

    const v = gestion.getVehiculos().get(vehiculo.getNumMatricula());
    expect(v?.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER);
  });

  test("recibirVehiculo → marca DISPONIBLE y calcula precio", () => {
    calcularPrecioReservaMock.mockReturnValue(1500);

    gestion.recibirVehiculo(reserva);

    const v = gestion.getVehiculos().get(vehiculo.getNumMatricula());
    expect(v?.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(calcularPrecioReservaMock).toHaveBeenCalled();
  });
});
