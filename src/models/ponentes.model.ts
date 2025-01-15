import supabase from '../utils/connection'

export class Ponente {
    static async obtenerPonentes(){
        const{data, error} = await supabase.rpc('p_obtener_ponentes', {
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async obtenerPonente(id_ponente: number){
        const {data, error} = await supabase.rpc('p_obtener_ponente',{
            p_id_ponente: id_ponente
        });
        if(error){
            throw error;
        }
        return data;
    }

}