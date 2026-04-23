interface Flight {
    "departureTime": string,
    "arrivalTime": string,
    "carrier": string,
    "origin": string,
    "destination": string,
}

class Flighter {

    departureTime: string
    arrivalTime: string
    carrier: string
    origin: string
    destination: string

    constructor(flight: Flight) {
        this.departureTime = flight.departureTime
        this.arrivalTime = flight.arrivalTime
        this.carrier = flight.carrier
        this.origin = flight.origin
        this.destination = flight.destination
    }

    /**
     * 
     * @returns Duration in hours
     */
    getDuration() {

        const departure = new Date(this.departureTime)
        const arrival = new Date(this.arrivalTime)

        const time = Math.abs(departure.getTime() - arrival.getTime())

        return time / (1000 * 60 * 60)
    }
}

export interface SearchDetails {
    departureTimeRange?: {
        min: string,
        max: string
    },
    maxDuration?: number,
    preferredCarrier?: string
}

export class FlightService {

    private readonly FLIHTS_URL = 'https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt'

    private readonly CARRIER_PREFERENCE_SCORES = {
        preferred: 0.9,
        other: 1.0
    }
    
    async getDistanceBetweenAirports(code1: string, code2: string): Promise<number> {

     return Promise.resolve(Math.random() * 100)
    }

    private async calculateScore(flight: Flight, carrierPrefernce?: string) {

        const distance = await this.getDistanceBetweenAirports(flight.origin, flight.destination)
        
        const carrierScore = flight.carrier === carrierPrefernce ? this.CARRIER_PREFERENCE_SCORES.preferred : this.CARRIER_PREFERENCE_SCORES.other
    
        const currFlight = new Flighter(flight)
    
        return (currFlight.getDuration() * carrierScore) + distance
    }

    private async fetchFlights() {

        const response = await fetch(this.FLIHTS_URL)

        if(response.status !== 200) {
            throw new Error('Failed to fetch flights')
        }

        const flights = await response.json()

        return flights
    }

    private filterFlights(flights: Flight[], searchDetails: SearchDetails) {

        return flights.filter(flight => {

            const currFlight = new Flighter(flight)

            const departureTime = new Date(flight.departureTime)

            if(searchDetails.departureTimeRange) {

                const minTime = new Date(searchDetails.departureTimeRange.min)
                const maxTime = new Date(searchDetails.departureTimeRange.max)

                if(departureTime < minTime || departureTime > maxTime) {
                    return false
                }
            }

            if(searchDetails.maxDuration && currFlight.getDuration() > searchDetails.maxDuration) {
                return false
            }

            if(searchDetails.preferredCarrier && searchDetails.preferredCarrier !== flight.carrier) {
                return false
            }

            return true
        })
    }

    async searchFlights(searchDetails: SearchDetails) {

        const flights: Flight[] = await this.fetchFlights()

        const filteredFlights = this.filterFlights(flights, searchDetails)

        const scoredFlights = await Promise.all(
            filteredFlights.map(async  (flight) => ({
                ...flight,
                score: await this.calculateScore(flight, searchDetails.preferredCarrier)
            }))
        )
        
        return scoredFlights.sort((a, b) => (a.score || 0) - (b.score || 0))
    }
}