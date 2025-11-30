import DatosMantenimiento from "../src/datosMantenimiento";

describe("DatosMantenimiento", () => {
  const originalDateNow = Date.now;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Date.now = originalDateNow;
  });

  test("constructor inicializa correctamente los valores", () => {
    const fecha = new Date(2023, 0, 1);
    const datos = new DatosMantenimiento(10000, fecha, 3);

    expect(datos.getKmUltimoMant()).toBe(10000);
    expect(datos.getFechaUltimoMant()).toBe(fecha);
    expect(datos.getAlquileresCantidad()).toBe(3);
  });

  test("setKmUltimoMant y getKmUltimoMant funcionan correctamente", () => {
    const datos = new DatosMantenimiento(0, new Date(), 0);

    datos.aumentarKmUltimoMant(15000);
    const total = datos.getKmUltimoMant();

    expect(total).toBe(15000);
  });

  test("setFechaUltimoMant y getFechaUltimoMant funcionan correctamente", () => {
    const fecha1 = new Date(2022, 5, 10);
    const fecha2 = new Date(2023, 3, 20);

    const datos = new DatosMantenimiento(0, fecha1, 0);

    datos.setFechaUltimoMant(fecha2);

    expect(datos.getFechaUltimoMant()).toBe(fecha2);
  });

  test("aumentarCantidadAlquileres incrementa en 1 el contador", () => {
    const datos = new DatosMantenimiento(0, new Date(), 2);

    datos.aumentarCantidadAlquileres();

    expect(datos.getAlquileresCantidad()).toBe(3);
  });

  test("calculadoraFecha devuelve 0 meses si la fecha es el mismo mes de la fecha actual simulada", () => {
    const ahora = new Date(2024, 0, 15);
    Date.now = () => ahora.getTime();

    const fechaUltimoMant = new Date(2024, 0, 1);

    const datos = new DatosMantenimiento(0, fechaUltimoMant, 0);

    const meses = datos.calculadoraFecha();

    expect(meses).toBe(0);
  });

  test("calculadoraFecha devuelve la cantidad de meses transcurridos (ej: 12 meses)", () => {
    const ahora = new Date(2024, 0, 1);
    Date.now = () => ahora.getTime();

    const fechaUltimoMant = new Date(2023, 0, 1);

    const datos = new DatosMantenimiento(0, fechaUltimoMant, 0);

    const meses = datos.calculadoraFecha();

    expect(meses).toBe(12);
  });
});