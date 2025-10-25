import Disponibilidad from "../src/disponibilidad";
import Reserva from "../src/reserva";
import moment from "moment";

// Creamos un mock simple de la clase Reserva (no necesitamos la real)
class ReservaMock {
  constructor(
    public inicio: string,
    public fin: string
  ) {}
}

describe("Disponibilidad", () => {
  let disponibilidad: Disponibilidad;

  beforeEach(() => {
    disponibilidad = new Disponibilidad();
  });

  test("debería devolver true si no hay reservas existentes", () => {
    const nueva = new ReservaMock("2025-10-10", "2025-10-12");
    const resultado = disponibilidad.estaDisponible(nueva as Reserva, []);
    expect(resultado).toBe(true);
  });

  test("debería devolver true si las fechas NO se solapan", () => {
    const existente = new ReservaMock("2025-10-01", "2025-10-05");
    const nueva = new ReservaMock("2025-10-10", "2025-10-15");

    const resultado = disponibilidad.estaDisponible(nueva as Reserva, [existente as Reserva]);
    expect(resultado).toBe(true);
  });

  test("debería devolver false si las fechas se solapan al inicio", () => {
    const existente = new ReservaMock("2025-10-05", "2025-10-10");
    const nueva = new ReservaMock("2025-10-08", "2025-10-12");

    const resultado = disponibilidad.estaDisponible(nueva as Reserva, [existente as Reserva]);
    expect(resultado).toBe(false);
  });

  test("debería devolver false si las fechas se solapan al final", () => {
    const existente = new ReservaMock("2025-10-10", "2025-10-15");
    const nueva = new ReservaMock("2025-10-05", "2025-10-12");

    const resultado = disponibilidad.estaDisponible(nueva as Reserva, [existente as Reserva]);
    expect(resultado).toBe(false);
  });

  test("debería devolver false si la nueva reserva contiene completamente a otra", () => {
    const existente = new ReservaMock("2025-10-10", "2025-10-12");
    const nueva = new ReservaMock("2025-10-09", "2025-10-13");

    const resultado = disponibilidad.estaDisponible(nueva as Reserva, [existente as Reserva]);
    expect(resultado).toBe(false);
  });
});
