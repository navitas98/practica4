import mongoose from "mongoose"
import { Citas } from "../types.ts";
const Schema=mongoose.Schema;
const CitasSchema=new Schema({
    dia:Number,
    mes:Number,
    ano:Number,
    hora:Number,
    disponible:Boolean,
    dni:{type:String, requiered:false}
})
//Validamos los datos dia, mes, ano y hora
CitasSchema.path("dia").validate( function (value:number) {
    if(value<1 || value > 31){throw new Error("El dia tiene que estar comprendido entre 1 y 31")}
})
CitasSchema.path("mes").validate(function (value:number ){
    if(value<1 || value >12){
        throw new Error("Solo hay doce meses con lo cual solo podemos guardar los meses de 1 al 12")
    }
})
CitasSchema.path("hora").validate(function(value:number){
    if(value<0 ||value >23){
        throw new Error("Error al introducir la hora")
    }
})
export type CitaModelType=mongoose.Document&Omit<Citas,"id">

export const CitaModel=mongoose.model<CitaModelType>("Cita",CitasSchema);
