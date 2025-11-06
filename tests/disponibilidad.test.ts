import Disponibilidad from "../src/disponibilidad";
import type Reserva from "../src/Reserva";
import { mock } from "jest-mock-extended";

const res = (y: number, m: number, d: number) => new Date(y, m, d);

const reservaMock = (ini: Date, fin: Date) => {
  const r = mock<Reserva>();
  r.getFechaInicio.mockReturnValue(ini);
  r.getFechaFinalizacion.mockReturnValue(fin);
  return r;
};

describe("Disponibilidad", () => {
  let disp: Disponibilidad;

  beforeEach(() => {
    disp = new Disponibilidad();
  });

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
});
