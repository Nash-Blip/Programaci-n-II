import Mantenimiento from "../src/mantenimiento";
import Vehiculo from "../src/vehiculo";

function crearVehiculoMock(): jest.Mocked<Vehiculo> {
  return {
    setEstadoEnMantenimiento: jest.fn(),
    setEstadoDisponible: jest.fn(),
  } as unknown as jest.Mocked<Vehiculo>;
}

describe("Mantenimiento", () => {
  const HORA_MS = 60 * 60 * 1000;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("el constructor deja el vehículo en estado EN_MANTENIMIENTO", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);

    new Mantenimiento(vehiculo, inicio);

    expect(vehiculo.setEstadoEnMantenimiento).toHaveBeenCalledTimes(1);
  });

  test("horasTranscurridas calcula correctamente la diferencia en horas", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);
    const mantenimiento = new Mantenimiento(vehiculo, inicio);

    const cincoHorasDespues = new Date(inicio.getTime() + 5 * HORA_MS);

    const horas = mantenimiento.horasTranscurridas(cincoHorasDespues);

    expect(horas).toBeCloseTo(5);
  });

  test("informeHorasTranscurridas devuelve false antes de las 24 horas", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);
    const mantenimiento = new Mantenimiento(vehiculo, inicio);

    const veintitresHoras = new Date(inicio.getTime() + 23 * HORA_MS);

    const resultado = mantenimiento.informeHorasTranscurridas(veintitresHoras);

    expect(resultado).toBe(false);
  });

  test("informeHorasTranscurridas devuelve true a las 24 horas o más", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);
    const mantenimiento = new Mantenimiento(vehiculo, inicio);

    const veinticuatroHoras = new Date(inicio.getTime() + 24 * HORA_MS);

    const resultado = mantenimiento.informeHorasTranscurridas(veinticuatroHoras);

    expect(resultado).toBe(true);
  });

  test("finalizar NO cambia el estado del vehículo si no pasó el tiempo de mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);
    const mantenimiento = new Mantenimiento(vehiculo, inicio);

    const antesDe24 = new Date(inicio.getTime() + 23 * HORA_MS);

    mantenimiento.finalizar(antesDe24);

    expect(vehiculo.setEstadoDisponible).not.toHaveBeenCalled();
  });

  test("finalizar cambia el estado del vehículo a DISPONIBLE si ya pasó el tiempo de mantenimiento", () => {
    const vehiculo = crearVehiculoMock();
    const inicio = new Date(2024, 0, 1, 0, 0, 0, 0);
    const mantenimiento = new Mantenimiento(vehiculo, inicio);

    const despuesDe24 = new Date(inicio.getTime() + 24 * HORA_MS);

    mantenimiento.finalizar(despuesDe24);

    expect(vehiculo.setEstadoDisponible).toHaveBeenCalledTimes(1);
  });
});
