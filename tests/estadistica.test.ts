import Estadistica from "../src/estadistica";
import Vehiculo from "../src/vehiculo";
import DatosEstadistica from "../src/datosEstadistica";
import { EstadoVehiculo } from "../src/estadoVehiculo";

describe("Tests Estadística", () =>{
    let estadistica: Estadistica;
    let mockDatosEstadistica: any;
    const mockVehiculo = (vecesAlquilado?: number, rentabilidad?: number, matricula?: number) => ({
          getNumMatricula: jest.fn().mockReturnValue(matricula),
          datosEstadistica: {
            getCantidadDeVecesAlquilado: jest.fn().mockReturnValue(vecesAlquilado),
            calcularRentabilidad: jest.fn().mockReturnValue(rentabilidad)
          }
    }) as unknown as Vehiculo;

    beforeEach(()=>{
      estadistica = new Estadistica();
    })

    test("El metodo vehiculoMasAlquilado() debe devolver el vehiculo3", () => {
      const vehiculo1 = mockVehiculo(2,0);
      const vehiculo2 = mockVehiculo(5,0);
      const vehiculo3 = mockVehiculo(10,0);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])

      const masAlquilado = estadistica.vehiculoMasAlquilado(mockMap);

      expect(masAlquilado).toBe(vehiculo3);
    })

    test("El metodo vehiculoMenosAlquilado() debe devolver el vehiculo1", () =>{
      const vehiculo1 = mockVehiculo(2,0);
      const vehiculo2 = mockVehiculo(5,0);
      const vehiculo3 = mockVehiculo(10,0);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])

      const menosAlquilado = estadistica.vehiculoMenosAlquilado(mockMap);

      expect(menosAlquilado).toBe(vehiculo1);
    })

    test("El metodo menosRentabilidad() debe devolver el vehiculo3", () =>{
      const vehiculo1 = mockVehiculo(0,450);
      const vehiculo2 = mockVehiculo(0,110);
      const vehiculo3 = mockVehiculo(0,-10);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])

      const menosRentable = estadistica.menosRentabilidad(mockMap);

      expect(menosRentable).toBe(vehiculo3)
    })

    test("El metodo mayorRentabilidad() debe devolver el vehiculo1", () =>{
      const vehiculo1 = mockVehiculo(0,450);
      const vehiculo2 = mockVehiculo(0,110);
      const vehiculo3 = mockVehiculo(0,-10);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])

      const menosRentable = estadistica.mayorRentabilidad(mockMap);

      expect(menosRentable).toBe(vehiculo1)
    })

    test("El metodo porcentajeEnAlquiler() debe devolver 66.66666666666666%", () =>{
      const vehiculo1 = mockVehiculo()
      const vehiculo2 = mockVehiculo()
      const vehiculo3 = mockVehiculo()

      const mockMap = new Map<number, Vehiculo>([
        [1, vehiculo1],
        [2, vehiculo2],
        [3, vehiculo3]
      ]);

      const mockCantidadEnAlquiler = 2;

      const porcentaje = estadistica.porcentajeEnAlquiler(mockMap, mockCantidadEnAlquiler);

      expect(porcentaje).toBe("66.66666666666666%");
    })

    test("El metodo generarReporte()", () =>{
      const vehiculo1 = mockVehiculo(5,450, 101);
      const vehiculo2 = mockVehiculo(2,110, 202);
      const vehiculo3 = mockVehiculo(10,-10, 303);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])
      const mockCantidadEnAlquiler = 2;

      const reporte = estadistica.generarReporte(mockMap, mockCantidadEnAlquiler);

      expect(reporte).toContain("Vehiculo mas alquilado: 303");
      expect(reporte).toContain("Vehiculo menos alquilado: 202");
      expect(reporte).toContain("Vehiculo mas rentable: 101")
      expect(reporte).toContain("Vehiculo menos rentable: 303")
      expect(reporte).toMatch(/Porcentaje en alquiler:/);
    })

})