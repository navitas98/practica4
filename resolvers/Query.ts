import { CitaModel, CitaModelType } from "../DB/cita.ts";

export const Query={
    citas_disponibles:async(_:unknown, args:{dia?:number, mes:number, ano:number}):Promise <CitaModelType[]>=>{
        const {dia,mes, ano}=args;
        if(dia!==undefined){
            const citas=await CitaModel.find({dia,mes,ano}).exec();
            return citas;
        }else{
        const citas=await CitaModel.find({mes,ano}).exec();
        return citas;
        }
    },
    
}