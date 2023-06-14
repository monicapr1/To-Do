import { writeFileSync, existsSync, readFileSync } from 'fs';
const filePath = 'data.json';

export class Data {
    constructor() {}

    static createFile() {
        try {
            if (!existsSync(filePath)) {
                writeFileSync(filePath, '[]');
            }
        } catch(ex) {
            console.error('Error al crear el archivo');
            console.error(ex);
        }
    }

    static readFile() {
        Data.createFile();
        try {
            const data = readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } catch(ex) {
            console.error('Error al leer el archivo');
            console.error(ex);
        }
    }

    static writeFile(data) {
        let todos = Data.readFile();
        try {
            todos.push(data);
            writeFileSync(filePath, JSON.stringify(todos));
        } catch(ex) {
            console.error('Error al escribir el archivo');
            console.error(ex);
        }
    }

    static replaceFile(data) {
        try {
            writeFileSync(filePath, JSON.stringify(data));
        } catch(ex) {
            console.error('Error al escribir el archivo');
            console.error(ex);
        }
    }



}
