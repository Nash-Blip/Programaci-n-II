import Disponibilidad from "../src/disponibilidad";
import type Reserva from "../src/Reserva";

const res = (y: number, m: number, d: number): Date => new Date(y, m, d);

const reservaMock = (ini: Date, fin: Date): jest.Mocked<Reserva> => {
  const r: Partial<jest.Mocked<Reserva>> = {
    getFechaInicio: jest.fn(() => ini),
    getFechaFinalizacion: jest.fn(() => fin),
  };

  return r as jest.Mocked<Reserva>;
};

describe("Disponibilidad", () => {
  let disp: Disponibilidad;

  beforeEach(() => {
    disp = new Disponibilidad();
  });

  // ----------- TESTS de estaDisponible -----------

  test("devuelve true si no hay reservas existentes", () => {
    const nueva = reservaMock(res(2025, 11, 10), res(2025, 11, 12));
    expect(disp.estaDisponible(nueva, [])).toBe(true);
  });

  test("devuelve true si no se solapan", () => {
    const existente = reservaMock(res(2025, 11, 1), res(2025, 11, 5));
    const nueva     = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    expect(disp.estaDisponible(nueva, [existente])).toBe(true);
  });

  test("devuelve false si la existente se solapa con el inicio de la nueva", () => {
    const existente = reservaMock(res(2025, 11, 5),  res(2025, 11, 10));
    const nueva     = reservaMock(res(2025, 11, 8),  res(2025, 11, 12));
    expect(disp.estaDisponible(nueva, [existente])).toBe(false);
  });

  test("devuelve false si la existente se solapa al final de la nueva", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva     = reservaMock(res(2025, 11, 5),  res(2025, 11, 12));
    expect(disp.estaDisponible(nueva, [existente])).toBe(false);
  });

  test("devuelve false si la nueva contiene por completo a la existente", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 12));
    const nueva     = reservaMock(res(2025, 11, 9),  res(2025, 11, 13));
    expect(disp.estaDisponible(nueva, [existente])).toBe(false);
  });

  test("devuelve false si el inicio de la nueva es igual a la existente", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva     = reservaMock(res(2025, 11, 10), res(2025, 11, 12));
    expect(disp.estaDisponible(nueva, [existente])).toBe(false);
  });

  test("devuelve false si el fin de la nueva es igual a la existente", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva     = reservaMock(res(2025, 11, 12), res(2025, 11, 15));
    expect(disp.estaDisponible(nueva, [existente])).toBe(false);
  });

  test("devuelve true si el final de la nueva es igual al inicio de la existente", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva     = reservaMock(res(2025, 11, 5),  res(2025, 11, 10));
    expect(disp.estaDisponible(nueva, [existente])).toBe(true);
  });

  test("devuelve true si el inicio de la nueva es igual al final de la existente", () => {
    const existente = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva     = reservaMock(res(2025, 11, 15), res(2025, 11, 20));
    expect(disp.estaDisponible(nueva, [existente])).toBe(true);
  });

  test("devuelve false si una de varias existentes se solapa", () => {
    const r1    = reservaMock(res(2025, 11, 1),  res(2025, 11, 5));
    const r2    = reservaMock(res(2025, 11, 10), res(2025, 11, 15));
    const nueva = reservaMock(res(2025, 11, 12), res(2025, 11, 18));
    expect(disp.estaDisponible(nueva, [r1, r2])).toBe(false);
  });

  // ----------- necesitaMantenimiento -----------

  describe("necesitaMantenimiento", () => {
    const crearReservaMock = (
      kilometro: number,
      kmUltimoMant: number,
      mesesDesdeMant: number,
      alquileresCantidad: number
    ): jest.Mocked<Reserva> => {
      const datosMantenimiento = {
        getKmUltimoMant: jest.fn(() => kmUltimoMant),
        calculadoraFecha: jest.fn(() => mesesDesdeMant),
        getAlquileresCantidad: jest.fn(() => alquileresCantidad),
      };

      const vehiculo = {
        getKilometro: jest.fn(() => kilometro),
        getDatosMantenimiento: jest.fn(() => datosMantenimiento),
      };

      const reserva = {
        getVehiculo: jest.fn(() => vehiculo),
      };

      return reserva as unknown as jest.Mocked<Reserva>;
    };

  });
});