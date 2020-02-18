import Stack from './Stack'
import Node from './Node'
import { esOperador, esVariable } from './Notation'

export default class BinaryTree {
    constructor() {
        this.root = null // Por default un arbol no tiene raiz
    }

    getRootNode() {
        return this.root;
    }

    insert(data, dir = 'left') { // por default se inserta a la izq en caso de no definirlo
        let newNode = new Node(data);

        // En caso de que sea el primer elemento que se agrega, entonces sera el nodo raiz
        if (this.root === null) {
            this.root = newNode;
        } else {
            // Entonces se tiene que agregar a la izq o a la der dependiendo de la direccion indicada
            this.insertNode(this.root, newNode, dir);
        }
    }

    insertNode(node, newNode, dir) {
        if (dir === 'left') node.left = newNode;
        else node.right = newNode;
    }

    createTree(sufija) {
        let contador = 0

        const stack = new Stack();

        let error = 0;

        for (let i = 0; i < sufija.length; i++) {
            if (error === 0) {
                const char = sufija[i];

                // SI ES UN NUMERO, VARIABLE O UN ARBOL (OBJETO)
                if (!isNaN(char) || esVariable(char) || typeof (char) == 'object')
                    stack.push({
                        key: contador++,
                        text: char
                    })

                else if (esOperador(char)) {
                    if (sufija.length === 2) {
                        const node = new Node(
                            {
                                key: contador++,
                                text: char
                            },
                            stack.pop()
                        )
                        stack.push(node);

                    } else if (stack.size() < 2) {
                        error = 3;

                    } else {
                        const operador2 = stack.pop();
                        const operador1 = stack.pop();

                        const node = new Node(
                            {
                                key: contador++,
                                text: char
                            },
                            operador1,
                            operador2
                        )

                        stack.push(node); // AGREGO EL ARBOL A LA PILA
                    }
                }
            } else break;
        }

        if (stack.size() === 0 || stack.size() > 1) error = 3;
        else if (typeof (stack.peek()) !== 'object') {  // SI EL ELEMENTO NO ES UN ARBOL (OBJETO)
            const tree = new BinaryTree();
            tree.insert(stack.pop()) // LO CONVIERTO EN UN ARBOL SIN HIJOS
            stack.push(tree);

        }

        if (error !== 0) { // SI ERROR ES DIFERENTE DE 0 ENTONCES HAY ERRORES
            while (stack.size() !== 0) { // MIENTRAS LA PILA TENGA ELEMENTOS
                stack.pop(); // LIMPIAMOS LA PILA
            }
        } else {
            return stack.pop()
        }
    }

}
