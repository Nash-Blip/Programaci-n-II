import Vehiculo from "../src/vehiculo";
import { EstadoVehiculo } from "../src/estadoVehiculo";
import { Tarifa } from "../src/Tarifa";
import DatosMantenimiento from "../src/datosMantenimiento";
import DatosEstadistica from "../src/datosEstadistica";

class VehiculoConcreto extends Vehiculo {}

describe("Vehiculo (clase base)", () => {
  test("constructor inicializa con valores por defecto", () => {
    const vehiculo = new VehiculoConcreto();

    expect(vehiculo.getNumMatricula()).toBe(0);
    expect(vehiculo.getKilometro()).toBe(0);
    expect(vehiculo.getTarifaBase()).toBe(0);
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);

    const datosMant = vehiculo.getDatosMantenimiento();
    const datosEst = vehiculo.getDatosEstadistica();

    expect(datosMant).toBeInstanceOf(DatosMantenimiento);
    expect(datosEst).toBeInstanceOf(DatosEstadistica);
  });

  test("setNumMatricula y getNumMatricula funcionan correctamente", () => {
    const vehiculo = new VehiculoConcreto();

    vehiculo.setNumMatricula(123);

    expect(vehiculo.getNumMatricula()).toBe(123);
  });

  test("setKilometro y getKilometro funcionan correctamente", () => {
    const vehiculo = new VehiculoConcreto();

    vehiculo.setKilometro(45678);

    expect(vehiculo.getKilometro()).toBe(45678);
  });

  test("los métodos de cambio de estado actualizan correctamente el estado del vehículo", () => {
    const vehiculo = new VehiculoConcreto();

    vehiculo.setEstadoEnAlquiler();
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.EN_ALQUILER);

    vehiculo.setEstadoEnMantenimiento();
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.EN_MANTENIMIENTO);

    vehiculo.setEstadoNecesitaLimpieza();
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.NECESITA_LIMPIEZA);

    vehiculo.setEstadoDisponible();
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.DISPONIBLE);
  });

  test("setLogicaTarifa y getLogicaTarifa guardan y devuelven la tarifa", () => {
    const vehiculo = new VehiculoConcreto();

    const tarifaMock = {} as Tarifa;

    vehiculo.setLogicaTarifa(tarifaMock);

    expect(vehiculo.getLogicaTarifa()).toBe(tarifaMock);
  });

  test("setDatosMantenimiento y getDatosMantenimiento funcionan correctamente", () => {
    const vehiculo = new VehiculoConcreto();
    const fecha = new Date(2024, 0, 1);
    const datos = new DatosMantenimiento(10000, fecha, 2);

    vehiculo.setDatosMantenimiento(datos);

    expect(vehiculo.getDatosMantenimiento()).toBe(datos);
  });

  test("setDatosEstadistica y getDatosEstadistica funcionan correctamente", () => {
    const vehiculo = new VehiculoConcreto();
    const datos = new DatosEstadistica();

    vehiculo.setDatosEstadistica(datos);

    expect(vehiculo.getDatosEstadistica()).toBe(datos);
  });
});
