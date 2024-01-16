import { CitaModel } from "../DB/cita.ts";

export const ComprobarCitaDisponible=async(dia:number, mes:number, ano:number,hora:number):Promise<boolean>=>{
    const cita=await CitaModel.findOne({dia, mes, ano,hora})
    if(!cita) return true;
    if(cita.disponible===false) {throw new Error("La cita ya esta ocupada")}
    return false
}