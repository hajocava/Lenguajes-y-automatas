import Stack from './Stack'

export function esOperador(caracter) {
    const operadores = ['+', '-', '*', '/', '^']
    return operadores.includes(caracter);
}

export function esVariable(caracter) {
    let ascii = caracter.toUpperCase().charCodeAt(0);
    return ascii > 64 && ascii < 91;
}

export function precedenciaMayor(cimaPila, operador) {
    const jerarquia = { ')': 1, '+': 2, '-': 2, '*': 3, '/': 3, '^': 4, '(': 5 }

    if (esOperador(cimaPila) && jerarquia[cimaPila] >= jerarquia[operador])
        return true;

    return false;
}

export function sufija(infija = '') {
    let error = false;

    if (infija.length !== 0) {
        infija = infija.replace(/ /g, ""); // ELIMINO ESPACIOS ENTRE CARACTERES
        const stack = new Stack(); // CREO MI PILA PARA DATOS LOCALES
        let arrayResultado = []; // LISTA DE SALIDA
        infija = infija.split('') // CONVIERTO MI CADENA EN UN ARRAY

        // MIENTRAS LA LISTA DE ENTRADA NO ESTE VACIA Y NO SE HA ENCONTRADO NINGUN ERROR
        for (let i = 0; i < infija.length; i++) {
            const caracter = infija[i];

            if (!isNaN(caracter) || esVariable(caracter)) // SI EL CARACTER ES UN NUMERO O UNA VARIABLE (LETRA)
                arrayResultado.push(caracter);
            else if (caracter === '(')
                stack.push(caracter);
            else if (caracter === ')') {
                // Mientras la pila no este vacia y el valor de la cima no sea un parentesis izquierdo
                while (stack.size() !== 0 && stack.peek() !== '(') {
                    arrayResultado.push(stack.pop()); // eliminar cima pila y agregar al resultado
                }

                if (stack.peek() === '(') stack.pop()
                else error = true;
            }
            else if (esOperador(caracter)) {
                // mientras la pila no este vacia y su cima sea un operador de
                // precedencia mayor o igual que la del operando
                while (stack.size() !== 0 && precedenciaMayor(stack.peek(), caracter)) {
                    arrayResultado.push(stack.pop());
                }
                stack.push(caracter)
            }
        }

        while (stack.size() !== 0) {
            arrayResultado.push(stack.pop());
        }

        if (error) return 'Error en la expresión, revise parentesis';
        return arrayResultado;

    } else return 'Expresion vacia';
}
