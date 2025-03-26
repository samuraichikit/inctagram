export type ResponseCountry = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null
  division3Code: null
  division4Code: null
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: [
    {
      id: string
      name: string
    },
  ]
  population: string
  timezone: string
  type: string
}

export type ResponseCity = {
  edges: ObjectWithEdges[]
}

export type ObjectWithEdges = {
  cursor: string
  node: {
    continentCode: string
    countryCode: string
    division1Code: string
    division2Code: null
    division3Code: null
    division4Code: null
    id: string
    latitude: number
    longitude: number
    name: string
    parentRegions: [
      {
        id: string
        name: string
      },
    ]
    population: string
    timezone: string
    type: string
  }
}
