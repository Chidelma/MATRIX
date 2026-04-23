import { FlightService, SearchDetails } from "../../../lib/flight";

export default class FlightSearch {

    static async GET(search: SearchDetails) {
        
        return await new FlightService().searchFlights(search)
    }
}