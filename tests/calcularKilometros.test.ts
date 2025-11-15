import CalcularKilometros from "../src/CalcularKilometros";

describe("Clase CalcularKilometros", () => {
    let calcular: CalcularKilometros;

    beforeEach(() => {
        calcular = new CalcularKilometros();
    });

    test("Debe calcular correctamente los km totales recorridos", () => {
        const resultado = calcular.calcularKmTotales(1000, 1500);
        expect(resultado).toBe(500);
    });
    
    test("Debe lanzar error si no hubo diferencia de kilometraje", () => {
       expect(() => calcular.calcularKmTotales(4000, 4000)).toThrow(
            "Los km finales no pueden ser menores o iguales que los iniciales."
        );
    });

    test("Debe lanzar error si kmFinales < kmIniciales", () => {
        expect(() => calcular.calcularKmTotales(5000, 4000)).toThrow(
            "Los km finales no pueden ser menores o iguales que los iniciales."
        );
    });

    test("Debe calcular correctamente el promedio de km diarios", () => {
        const promedio = calcular.promedioKmDiarios(500, 5);
        expect(promedio).toBe(100);
    });

    test("Debe manejar promedios decimales correctamente", () => {
        const promedio = calcular.promedioKmDiarios(1000, 3);
        expect(promedio).toBeCloseTo(333.33, 2);
    });

    test("Debe lanzar error si los días son 0 o negativos", () => {
        expect(() => calcular.promedioKmDiarios(300, 0)).toThrow(
            "Los dias deben ser mayor a 0"
        );
        expect(() => calcular.promedioKmDiarios(300, -2)).toThrow(
            "Los dias deben ser mayor a 0"
        );
    });
});