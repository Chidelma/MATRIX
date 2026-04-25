import { Matrix } from '../../lib/matrix'

export default class Multiply {

    static async POST(form: { file: string }) {

        return await Matrix.processMatrix(form, matrix => matrix.multiply())
    }
}