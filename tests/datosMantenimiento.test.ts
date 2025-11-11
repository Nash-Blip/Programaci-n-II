import DatosMantenimiento from "../src/datosMantenimiento";
import moment from "moment";

describe("DatosMantenimiento", () => {
  test("calculadoraFecha devuelve 0 si el mantenimiento fue este mes", () => {
    const fechaActual = new Date();
    const datos = new DatosMantenimiento(50000, fechaActual, 2);

    const resultado = datos.calculadoraFecha();

    expect(resultado).toBe(0);
  });

  test("calculadoraFecha devuelve 6 si el mantenimiento fue hace 6 meses", () => {
    const fechaHaceSeisMeses = moment().subtract(6, "months").toDate(); 
    const datos = new DatosMantenimiento(40000, fechaHaceSeisMeses, 3);

    const resultado = datos.calculadoraFecha();

    expect(resultado).toBe(6);
  });

  test("calculadoraFecha devuelve 12 si el mantenimiento fue hace 1 año", () => {
    const fechaHaceUnAño = moment().subtract(1, "year").toDate();
    const datos = new DatosMantenimiento(30000, fechaHaceUnAño, 5);

    const resultado = datos.calculadoraFecha();

    expect(resultado).toBe(12);
  });
});