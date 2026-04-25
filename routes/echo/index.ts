import { Matrix } from '../../lib/matrix'

export default class Echo {

    static async POST(form: { file: string }) {

        return await Matrix.processMatrix(form, matrix => matrix.toString())
    }
}