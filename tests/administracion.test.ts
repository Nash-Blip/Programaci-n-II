import Administracion from "../src/administracion";
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
        public vehiculo: Vehiculo,
        public kmIniciales: number,
        public kmFinales: number
      ) {}
      calcularPrecioReserva = calcularPrecioReservaMock;
      getVehiculo = getVehiculoMock;
    },
  };
});

const d = (y: number, m: number, day: number) => new Date(y, m, day);

describe("Administracion (mock de Reserva y Disponibilidad)", () => {
  let admin: Administracion;
  let vehiculo: Vehiculo;
  let reserva: any;

  beforeEach(() => {
    estaDisponibleMock.mockReset();
    calcularPrecioReservaMock.mockReset();
    getVehiculoMock.mockReset();

    admin = new Administracion();

    vehiculo = new Sedan(123, "Sedan", 10000, EstadoVehiculo.DISPONIBLE);

    const ReservaMock = jest.requireMock("../src/Reserva").default;
    reserva = new ReservaMock(1, d(2025, 10, 10), d(2025, 10, 15), vehiculo, 1000, 1200);

    getVehiculoMock.mockReturnValue(vehiculo);

    admin.getVehiculos().set(vehiculo.getNumMatricula(), vehiculo);
  });

  test("procesarReserva devuelve true cuando disponibilidad es true", () => {
    estaDisponibleMock.mockReturnValue(true);
    expect(admin.procesarReserva(reserva)).toBe(true);
    expect(estaDisponibleMock).toHaveBeenCalled();
  });

  test("procesarReserva lanza error si el vehículo no existe", () => {
    const g2 = new Administracion();
    estaDisponibleMock.mockReturnValue(true);
    expect(() => g2.procesarReserva(reserva)).toThrow("Vehiculo no encontrado.");
  });

  test("procesarReserva lanza error si el vehículo no está disponible", () => {
    vehiculo.setEstadoEnAlquiler();
    expect(() => admin.procesarReserva(reserva)).toThrow("El vehiculo no esta disponible.");
    expect(estaDisponibleMock).not.toHaveBeenCalled();
  });

  test("procesarReserva devuelve false cuando disponibilidad es false", () => {
    estaDisponibleMock.mockReturnValue(false);
    expect(admin.procesarReserva(reserva)).toBe(false);
  });

  test("procesarReserva devuelve true cuando disponibilidad es true", () => {
    estaDisponibleMock.mockReturnValue(true);
    expect(admin.procesarReserva(reserva)).toBe(true);
  });

  test("entregarVehiculo agrega una reserva y cambia el estado a EN_ALQUILER", () => {
    admin.entregarVehiculo(reserva);

    const reservas = admin.getReservas().get(vehiculo.getNumMatricula());
    expect(reservas?.length).toBe(1);
    expect(reservas?.[0]).toBe(reserva);

    const v = admin.getVehiculos().get(vehiculo.getNumMatricula());
    expect(v?.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER);
  });

  test("recibirVehiculo lo marca DISPONIBLE y notifica el precio", () => {
    calcularPrecioReservaMock.mockReturnValue(1500);

    const precio = admin.recibirVehiculo(reserva);
    
    const v = admin.getVehiculos().get(vehiculo.getNumMatricula());
    expect(v?.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
    expect(calcularPrecioReservaMock).toHaveBeenCalled();
    expect(precio).toBe(1500);
  });
});
