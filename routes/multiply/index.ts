import { Matrix } from '../../lib/matrix'

export default class Multiply {

    static async POST(form: { file: string }) {

        return await Matrix.ProcessMatrix(form, matrix => matrix.Multiply())
    }
}