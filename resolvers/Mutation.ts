import { CitaModel, CitaModelType } from "../DB/cita.ts";
import { ComprobarCitaDisponible } from "../ayudasCodigo/comprobarCitaDisponible.ts";
export const Mutation={
    nuevaCita:async(_:unknown,args:{dia:number, mes:number, ano:number, hora:number}):Promise<CitaModelType>=>{
        const {dia,mes,ano,hora}=args;
        const Cita={
            dia,
            mes,
            ano,
            hora,
            disponible:true
        }
        //Comprobamos que esta disponible la cita
        const citaDisponible=await ComprobarCitaDisponible(dia, mes,ano,hora);
        if(citaDisponible===true){
            const nuevaCita=await CitaModel.create(Cita)
            return nuevaCita;
        }else{
           const cita_bd=await CitaModel.findOne({dia, mes, ano,hora});
           //No haria falta comprobar que la cita no existe ya que lo hemos hecho en comprobarCitadisponible, lo he puesto para que no me salte el error
           if(!cita_bd)throw new Error("el id de la cita no existe")
           return cita_bd;
        }
        
    },
    eliminarCita:async(_:unknown,args:{dia:number,mes:number,ano:number,hora:number}):Promise<CitaModelType>=>{
        const {dia,mes, ano,hora}=args;
        const cita=await CitaModel.findOne({dia,mes,ano,hora});
        if(!cita)throw new Error("No hay ninguna cita con estos datos")
        if(cita.disponible===false){throw new Error("La cita esta ocupada")};
        const citaBorrada=await CitaModel.findByIdAndDelete(cita._id);
        if(!citaBorrada){throw new Error("El id de la cita es incorrecto")}
        return citaBorrada
    },
    reservarCita:async(_:unknown,args:{dia:number, mes:number,ano:number,hora:number, dni:string}):Promise<CitaModelType>=>{
        const {dia,mes, ano,hora,  dni}=args;
        const citaDisponible=await ComprobarCitaDisponible(dia, mes,ano, hora);
        if(citaDisponible===true)throw new Error("No hay ninguna cita creada con estos parametros, intente reservar ver las citas disponibles y haga su reserva")
        const cita = await CitaModel.findOneAndUpdate(
            { dia, mes, ano, hora },
            {   disponible:false,
                dni }, 
            { new: true } 
        );
        if(!cita)throw new Error("No hemos encontrado la cita");
        return cita
    }
    
}