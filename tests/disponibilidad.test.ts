import Disponibilidad from "../src/disponibilidad";

const res = (y: number, m: number, d: number) => new Date(y, m, d);
const reservaLike = (ini: Date, fin: Date) => ({
  getFechaInicio: () => ini,
  getFechaFinalizacion: () => fin,
});

describe("Disponibilidad", () => {
  let disp: Disponibilidad;

  beforeEach(() => {
    disp = new Disponibilidad();
  });

  test("devuelve true si no hay reservas existentes", () => {
    const nueva = reservaLike(res(2025,10,10), res(2025,10,12));
    expect(disp.estaDisponible(nueva as any, [])).toBe(true);
  });

  test("devuelve true si no se solapan", () => {
    const existente = reservaLike(res(2025,10,1), res(2025,10,5));
    const nueva     = reservaLike(res(2025,10,10), res(2025,10,15));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(true);
  });

  test("devuelve false si se solapa al inicio", () => {
    const existente = reservaLike(res(2025,10,5), res(2025,10,10));
    const nueva     = reservaLike(res(2025,10,8), res(2025,10,12));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(false);
  });

  test("devuelve false si solapa al final", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva     = reservaLike(res(2025,10,5),  res(2025,10,12));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(false);
  });

  test("devuelve false si la nueva contiene por completo a la existente", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,12));
    const nueva     = reservaLike(res(2025,10,9),  res(2025,10,13));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(false);
  });

  test("devuelve false si nueva.inicio == existente.inicio", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva     = reservaLike(res(2025,10,10), res(2025,10,12));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(false);
  });

  test("devuelve false si nueva.fin == existente.fin", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva     = reservaLike(res(2025,10,12), res(2025,10,15));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(false);
  });

  test("devuelve true si nueva.fin == existente.inicio", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva     = reservaLike(res(2025,10,5),  res(2025,10,10));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(true);
  });

  test("devuelve true si nueva.inicio == existente.fin", () => {
    const existente = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva     = reservaLike(res(2025,10,15), res(2025,10,20));
    expect(disp.estaDisponible(nueva as any, [existente as any])).toBe(true);
  });

  test("devuelve false si una de varias existentes solapa", () => {
    const r1   = reservaLike(res(2025,10,1),  res(2025,10,5));
    const r2   = reservaLike(res(2025,10,10), res(2025,10,15));
    const nueva= reservaLike(res(2025,10,12), res(2025,10,18));
    expect(disp.estaDisponible(nueva as any, [r1 as any, r2 as any])).toBe(false);
  });
});
