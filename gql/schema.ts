export const typeDefs = `#graphql
type Cita{
    id:ID!
    dia:Int!
    mes:Int!
    ano:Int!
    hora:Int!
    disponible:Boolean!
    dni:String
}
type Mutation{
    nuevaCita(dia:Int!, mes:Int!, ano:Int, hora:Int!):Cita!
    eliminarCita(dia:Int!, mes:Int!, ano:Int, hora:Int!):Cita!
    reservarCita(dia:Int!, mes:Int!, ano:Int!,hora:Int! dni:String!):Cita!
}
type Query{
    test:String!
    citas_disponibles(dia:Int, mes:Int!, ano:Int!):[Cita!]!
    
}
`