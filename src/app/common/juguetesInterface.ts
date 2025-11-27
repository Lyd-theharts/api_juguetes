export interface ApiResponseGetJuguetes {
  juguetes: Juguete[]
}

export interface ApiResponseGetOneJuguete {
  status: boolean
  juguetes: Juguete
}

export interface Juguete {
  _id: string
  nombre: string
  imagen: string
  categoria: string
  edadMinima: number
  precio: number
}

export interface ApiResponseMessage{
  message: string
}

export interface ApiResponsePaginadoJuguetes {
  juguetes: Juguetes
}

export interface Juguetes {
  info: Info
  juguetes: Juguete[]
}

export interface Info {
  total: number
  pages: number
}
