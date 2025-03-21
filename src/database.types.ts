export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  congreso: {
    Tables: {
      tbl_asistencias: {
        Row: {
          hora_entrada: string | null
          hora_salida: string | null
          id_asistencia: number
          id_conferencia: number
          id_usuario: number
          validacion: boolean
        }
        Insert: {
          hora_entrada?: string | null
          hora_salida?: string | null
          id_asistencia?: number
          id_conferencia: number
          id_usuario: number
          validacion?: boolean
        }
        Update: {
          hora_entrada?: string | null
          hora_salida?: string | null
          id_asistencia?: number
          id_conferencia?: number
          id_usuario?: number
          validacion?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tbl_asistencias_id_conferencia_fkey"
            columns: ["id_conferencia"]
            isOneToOne: false
            referencedRelation: "tbl_conferencias"
            referencedColumns: ["id_conferencia"]
          },
          {
            foreignKeyName: "tbl_asistencias_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_carreras_unah: {
        Row: {
          carrera_unah: string
          id_carrera_unah: number
        }
        Insert: {
          carrera_unah: string
          id_carrera_unah?: number
        }
        Update: {
          carrera_unah?: string
          id_carrera_unah?: number
        }
        Relationships: []
      }
      tbl_conferencias: {
        Row: {
          cupos: number | null
          descripcion_conferencia: string
          direccion: string
          fecha_conferencia: string
          finalizado: boolean | null
          hora_final: string
          hora_inicio: string
          id_conferencia: number
          id_ponente: number
          img_conferencia: string | null
          inactivo: boolean | null
          nombre: string
          url_carpeta_zip: string | null
        }
        Insert: {
          cupos?: number | null
          descripcion_conferencia: string
          direccion: string
          fecha_conferencia: string
          finalizado?: boolean | null
          hora_final: string
          hora_inicio: string
          id_conferencia?: number
          id_ponente: number
          img_conferencia?: string | null
          inactivo?: boolean | null
          nombre: string
          url_carpeta_zip?: string | null
        }
        Update: {
          cupos?: number | null
          descripcion_conferencia?: string
          direccion?: string
          fecha_conferencia?: string
          finalizado?: boolean | null
          hora_final?: string
          hora_inicio?: string
          id_conferencia?: number
          id_ponente?: number
          img_conferencia?: string | null
          inactivo?: boolean | null
          nombre?: string
          url_carpeta_zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_conferencias_id_ponente_fkey"
            columns: ["id_ponente"]
            isOneToOne: false
            referencedRelation: "tbl_ponentes"
            referencedColumns: ["id_ponente"]
          },
        ]
      }
      tbl_diplomas: {
        Row: {
          fecha_creacion: string
          id_diploma: number
          id_usuario: number
          url_diploma: string | null
        }
        Insert: {
          fecha_creacion?: string
          id_diploma?: number
          id_usuario: number
          url_diploma?: string | null
        }
        Update: {
          fecha_creacion?: string
          id_diploma?: number
          id_usuario?: number
          url_diploma?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_diplomas_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_inscripciones_conferencias: {
        Row: {
          fecha_inscripcion: string | null
          id_conferencia: number | null
          id_inscripcion: number
          id_usuario: number
        }
        Insert: {
          fecha_inscripcion?: string | null
          id_conferencia?: number | null
          id_inscripcion?: number
          id_usuario: number
        }
        Update: {
          fecha_inscripcion?: string | null
          id_conferencia?: number | null
          id_inscripcion?: number
          id_usuario?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_inscripciones_conferencias_id_conferencia_fkey"
            columns: ["id_conferencia"]
            isOneToOne: false
            referencedRelation: "tbl_conferencias"
            referencedColumns: ["id_conferencia"]
          },
          {
            foreignKeyName: "tbl_inscripciones_conferencias_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_personas: {
        Row: {
          apellidos: string
          id_persona: number
          nombres: string
        }
        Insert: {
          apellidos: string
          id_persona?: number
          nombres: string
        }
        Update: {
          apellidos?: string
          id_persona?: number
          nombres?: string
        }
        Relationships: []
      }
      tbl_ponentes: {
        Row: {
          descripcion_ponente: string | null
          id_ponente: number
          img_perfil: string | null
          inactivo: boolean | null
        }
        Insert: {
          descripcion_ponente?: string | null
          id_ponente: number
          img_perfil?: string | null
          inactivo?: boolean | null
        }
        Update: {
          descripcion_ponente?: string | null
          id_ponente?: number
          img_perfil?: string | null
          inactivo?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_ponentes_id_ponente_fkey"
            columns: ["id_ponente"]
            isOneToOne: true
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_qr_codes: {
        Row: {
          id_qr: number
          url_qr: string | null
        }
        Insert: {
          id_qr?: number
          url_qr?: string | null
        }
        Update: {
          id_qr?: number
          url_qr?: string | null
        }
        Relationships: []
      }
      tbl_recursos: {
        Row: {
          id_conferencia: number
          id_recurso: number
          nombre_recurso: string | null
          url_descarga: string
          url_vista_previa: string | null
        }
        Insert: {
          id_conferencia: number
          id_recurso?: number
          nombre_recurso?: string | null
          url_descarga: string
          url_vista_previa?: string | null
        }
        Update: {
          id_conferencia?: number
          id_recurso?: number
          nombre_recurso?: string | null
          url_descarga?: string
          url_vista_previa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_recursos_id_conferencia_fkey"
            columns: ["id_conferencia"]
            isOneToOne: false
            referencedRelation: "tbl_conferencias"
            referencedColumns: ["id_conferencia"]
          },
        ]
      }
      tbl_tipos_usuario: {
        Row: {
          id_tipo_usuario: number
          tipo_usuario: string | null
        }
        Insert: {
          id_tipo_usuario?: number
          tipo_usuario?: string | null
        }
        Update: {
          id_tipo_usuario?: number
          tipo_usuario?: string | null
        }
        Relationships: []
      }
      tbl_tipos_verificacion: {
        Row: {
          id_tipo_verificacion: number
          tipo_verificacion: string
        }
        Insert: {
          id_tipo_verificacion?: number
          tipo_verificacion: string
        }
        Update: {
          id_tipo_verificacion?: number
          tipo_verificacion?: string
        }
        Relationships: []
      }
      tbl_universidades: {
        Row: {
          abreviatura: string | null
          id_universidad: number
          universidad: string | null
        }
        Insert: {
          abreviatura?: string | null
          id_universidad?: number
          universidad?: string | null
        }
        Update: {
          abreviatura?: string | null
          id_universidad?: number
          universidad?: string | null
        }
        Relationships: []
      }
      tbl_usuarios: {
        Row: {
          check_qr_carnet: boolean | null
          codigo_recibo: string | null
          contrasena: string
          correo: string
          dni: string
          estudiante: boolean
          externo: boolean
          fecha_nacimiento: string | null
          genero: string | null
          id_carrera_unah: number | null
          id_qr: number | null
          id_tipo_usuario: number
          id_universidad: number | null
          id_usuario: number
          identificador_unah: string | null
          img_recibo: string | null
          telefono: string
          token_actual: string | null
          validacion: boolean | null
        }
        Insert: {
          check_qr_carnet?: boolean | null
          codigo_recibo?: string | null
          contrasena: string
          correo: string
          dni: string
          estudiante: boolean
          externo: boolean
          fecha_nacimiento?: string | null
          genero?: string | null
          id_carrera_unah?: number | null
          id_qr?: number | null
          id_tipo_usuario: number
          id_universidad?: number | null
          id_usuario: number
          identificador_unah?: string | null
          img_recibo?: string | null
          telefono: string
          token_actual?: string | null
          validacion?: boolean | null
        }
        Update: {
          check_qr_carnet?: boolean | null
          codigo_recibo?: string | null
          contrasena?: string
          correo?: string
          dni?: string
          estudiante?: boolean
          externo?: boolean
          fecha_nacimiento?: string | null
          genero?: string | null
          id_carrera_unah?: number | null
          id_qr?: number | null
          id_tipo_usuario?: number
          id_universidad?: number | null
          id_usuario?: number
          identificador_unah?: string | null
          img_recibo?: string | null
          telefono?: string
          token_actual?: string | null
          validacion?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_usuarios_id_carrera_unah_fkey"
            columns: ["id_carrera_unah"]
            isOneToOne: false
            referencedRelation: "tbl_carreras_unah"
            referencedColumns: ["id_carrera_unah"]
          },
          {
            foreignKeyName: "tbl_usuarios_id_qr_fkey"
            columns: ["id_qr"]
            isOneToOne: false
            referencedRelation: "tbl_qr_codes"
            referencedColumns: ["id_qr"]
          },
          {
            foreignKeyName: "tbl_usuarios_id_tipo_usuario_fkey"
            columns: ["id_tipo_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_tipos_usuario"
            referencedColumns: ["id_tipo_usuario"]
          },
          {
            foreignKeyName: "tbl_usuarios_id_universidad_fkey"
            columns: ["id_universidad"]
            isOneToOne: false
            referencedRelation: "tbl_universidades"
            referencedColumns: ["id_universidad"]
          },
          {
            foreignKeyName: "tbl_usuarios_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_verificaciones: {
        Row: {
          codigo_verificacion: string | null
          estado: boolean | null
          fecha_expiracion: string | null
          fecha_validacion: string | null
          id_tipo_verificacion: number | null
          id_usuario: number
          id_verificacion: number
        }
        Insert: {
          codigo_verificacion?: string | null
          estado?: boolean | null
          fecha_expiracion?: string | null
          fecha_validacion?: string | null
          id_tipo_verificacion?: number | null
          id_usuario: number
          id_verificacion?: number
        }
        Update: {
          codigo_verificacion?: string | null
          estado?: boolean | null
          fecha_expiracion?: string | null
          fecha_validacion?: string | null
          id_tipo_verificacion?: number | null
          id_usuario?: number
          id_verificacion?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_verificaciones_id_tipo_verificacion_fkey"
            columns: ["id_tipo_verificacion"]
            isOneToOne: false
            referencedRelation: "tbl_tipos_verificacion"
            referencedColumns: ["id_tipo_verificacion"]
          },
          {
            foreignKeyName: "tbl_verificaciones_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insertar_recurso: {
        Args: {
          p_url_descarga: string
          p_url_vista_previa: string
          p_id_conferencia: number
          p_nombre_recurso: string
        }
        Returns: {
          codigo_resultado: number
          message: string
          id_recurso_salida: number
          nombre_recurso_salida: string
          url_descarga_salida: string
          url_vista_previa_salida: string
          id_conferencia_salida: number
        }[]
      }
      insertar_token_usuario: {
        Args: {
          p_correo: string
          p_contrasenia: string
          p_token: string
        }
        Returns: number
      }
      logout: {
        Args: {
          p_correo: string
        }
        Returns: number
      }
      p_actualizar_correo_usuario: {
        Args: {
          p_id_usuario: number
          p_nuevo_correo: string
        }
        Returns: undefined
      }
      p_actualizar_usuario_persona: {
        Args: {
          p_id_persona: number
          p_nombres?: string
          p_apellidos?: string
          p_dni?: string
          p_correo?: string
          p_contrasena?: string
        }
        Returns: Record<string, unknown>
      }
      p_asistencia_hora_salida: {
        Args: {
          p_id_usuario: number
          p_id_conferencia: number
          p_hora_salida: string
        }
        Returns: Record<string, unknown>
      }
      p_asistencias_usuario: {
        Args: {
          p_id_usuario: number
        }
        Returns: Record<string, unknown>
      }
      p_buscar_usuario: {
        Args: {
          p_parametro_busqueda: string
        }
        Returns: Record<string, unknown>
      }
      p_buscar_usuario_por_id: {
        Args: {
          id_usuario_param: number
        }
        Returns: {
          id_usuario: number
          dni: string
          nombres: string
          apellidos: string
          correo: string
          telefono: string
          numero_cuenta: string
          img_recibo: string
          codigo_recibo: string
          url_qr: string
        }[]
      }
      p_cambiar_contrasena: {
        Args: {
          p_correo: string
          p_nueva_contrasena: string
        }
        Returns: string
      }
      p_cambiar_validacion: {
        Args: {
          p_usuario_id: number
          p_nuevo_estado: boolean
          p_url_qr?: string
        }
        Returns: Record<string, unknown>
      }
      p_cancelar_inscripcion_en_conferencia: {
        Args: {
          p_id_usuario: number
          p_id_conferencia: number
        }
        Returns: string
      }
      p_carreras_unah: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_carrera_unah: number
          carrera_unah: string
        }[]
      }
      p_conferencias_por_usuario: {
        Args: {
          p_id_usuario: number
          p_dia?: string
        }
        Returns: {
          id_conferencia: number
          nombre_ponente: string
          img_ponente: string
          titulo: string
          lugar: string
          horario: string
          datosimportantes: string[]
          fecha: string
          cupos_disponibles: number
          finalizado: boolean
          url_carpeta_zip: string
        }[]
      }
      p_crear_asistencia: {
        Args: {
          p_id_usuario: number
          p_id_conferencia: number
          p_hora_entrada: string
        }
        Returns: Record<string, unknown>
      }
      p_crear_conferencia: {
        Args: {
          p_nombre_conferencia: string
          p_id_ponente: number
          p_nombres_ponente: string
          p_apellidos_ponente: string
          p_descripcion_ponente: string
          p_img_perfil_ponente: string
          p_descripcion_conferencia: string
          p_direccion: string
          p_fecha_conferencia: string
          p_hora_inicio: string
          p_hora_final: string
          p_cupos: number
          p_img_conferecia: string
          p_url_carpeta_zip: string
        }
        Returns: Record<string, unknown>
      }
      p_editar_conferencia: {
        Args: {
          p_id_conferencia: number
          p_id_ponente: number
          p_nombre: string
          p_nombres_ponente: string
          p_apellidos_ponente: string
          p_descripcion_conferencia: string
          p_descripcion_ponente: string
          p_direccion: string
          p_fecha_conferencia: string
          p_hora_inicio: string
          p_hora_final: string
          p_cupos: number
          p_img_conferecia: string
          p_img_ponente: string
          p_url_carpeta_zip: string
        }
        Returns: Record<string, unknown>
      }
      p_eliminar_conferencia: {
        Args: {
          p_id_conferencia: number
        }
        Returns: Record<string, unknown>
      }
      p_guardar_codigo_verificacion: {
        Args: {
          p_codigo_verificacion: string
          p_id_tipo_verificacion: number
          p_correo: string
        }
        Returns: number
      }
      p_insertar_conferencia: {
        Args: {
          p_id_ponente: number
          p_nombre: string
          p_descripcion: string
          p_direccion: string
          p_fecha_conferencia: string
          p_hora_inicio: string
          p_hora_final: string
          p_cupos: number
          p_url_carpeta_zip: string
        }
        Returns: {
          id_conferencia: number
          id_ponente: number
          nombre: string
          descripcion: string
          direccion: string
          fecha_conferencia: string
          hora_inicio: string
          hora_final: string
          cupos: number
        }[]
      }
      p_insertar_persona: {
        Args: {
          p_nombres: string
          p_apellidos: string
        }
        Returns: number
      }
      p_insertar_ponente: {
        Args: {
          p_descripcion: string
          p_nivel_academico: string
          p_img_perfil: string
          p_nacionalidad: string
        }
        Returns: {
          id_ponente: number
          descripcion: string
          nivel_academico: string
          img_perfil: string
          nacionalidad: string
        }[]
      }
      p_insertar_registro_en_conferencia: {
        Args: {
          p_id_usuario: number
          p_id_conferencia: number
        }
        Returns: string
      }
      p_insertar_usuario: {
        Args: {
          p_id_persona: number
          p_id_universidad: number
          p_id_tipo_usuario: number
          p_dni: string
          p_telefono: string
          p_fecha_nacimiento: string
          p_genero: string
          p_externo: boolean
          p_estudiante: boolean
          p_identificador_unah: string
          p_correo: string
          p_contrasena: string
          p_img_recibo: string
          p_codigo_recibo: string
          p_id_carrera_unah: number
        }
        Returns: {
          id_persona: number
          nombres: string
          apellidos: string
          dni: string
          telefono: string
          fecha_nacimiento: string
          genero: string
          identificador_unah: string
          estudiante: boolean
          correo: string
          contrasena: string
          codigo_recibo: string
          id_carrera_unah: number
        }[]
      }
      p_limpiar_usuarios_no_verificados: {
        Args: {
          p_id_usuario: number
        }
        Returns: undefined
      }
      p_login: {
        Args: {
          p_correo: string
          p_contrasenia: string
        }
        Returns: Record<string, unknown>
      }
      p_obtener_conferencia: {
        Args: {
          p_id_conferencia: number
        }
        Returns: {
          id_ponente: number
          nombres: string
          apellidos: string
          img_ponente: string
          img_conferencia: string
          titulo: string
          lugar: string
          hora_inicio: string
          hora_final: string
          descripcion_conferencia: string
          descripcion_ponente: string
          fecha: string
          cupos: number
          finalizado: boolean
          url_carpeta_zip: string
        }[]
      }
      p_obtener_conferencias: {
        Args: {
          p_dia?: string
        }
        Returns: {
          id_conferencia: number
          nombre_ponente: string
          img_ponente: string
          titulo: string
          lugar: string
          horario: string
          datosimportantes: string[]
          fecha: string
          cupos_disponibles: number
          finalizado: boolean
          url_carpeta_zip: string
        }[]
      }
      p_obtener_conferencias_inscritas_por_usuario: {
        Args: {
          p_id_usuario: number
          p_dia: string
        }
        Returns: {
          id_conferencia: number
          nombre_ponente: string
          img_ponente: string
          titulo: string
          lugar: string
          horario: string
          datosimportantes: string[]
          fecha: string
          cupos_disponibles: number
          url_carpeta_zip: string
          inscrito: boolean
        }[]
      }
      p_obtener_conferencias_por_fecha: {
        Args: {
          p_fecha_actual: string
        }
        Returns: {
          id_conferencia: number
          nombre: string
        }[]
      }
      p_obtener_conferencias_usuario_nuevo_campo: {
        Args: {
          p_id_usuario: number
          p_dia: string
        }
        Returns: {
          id_conferencia: number
          nombre_ponente: string
          img_ponente: string
          titulo: string
          lugar: string
          horario: string
          datosimportantes: string[]
          fecha: string
          cupos_disponibles: number
          url_carpeta_zip: string
          finalizado: boolean
          inscrito: boolean
        }[]
      }
      p_obtener_ponente: {
        Args: {
          p_id_ponente: number
        }
        Returns: {
          nombres: string
          descripcion: string
          img_perfil: string
        }[]
      }
      p_obtener_ponentes: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_ponente: number
          nombres: string
          descripcion: string
          img_perfil: string
        }[]
      }
      p_obtener_universidades: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_universidad: number
          universidad: string
          abreviatura: string
        }[]
      }
      p_participante_certificado_por_id: {
        Args: {
          p_id_usuario: number
        }
        Returns: {
          id_usuario: number
          dni: string
          nombre_completo: string
          correo: string
          img_recibo: string
          codigo_recibo: string
        }[]
      }
      p_participantes_certificados: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_usuario: number
          dni: string
          nombre_completo: string
          correo: string
          img_recibo: string
          codigo_recibo: string
        }[]
      }
      p_usuarios_admitidos: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_usuario: number
          dni: string
          nombre_completo: string
          correo: string
          universidad: string
          identificador_unah: string
          carrera: string
          url_qr: string
        }[]
      }
      p_usuarios_admitidos_listado: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_usuario: number
          dni: string
          nombre_completo: string
          correo: string
          universidad: string
          identificador_unah: string
          carrera: string
          url_qr: string
        }[]
      }
      p_usuarios_validaciones: {
        Args: {
          validacion_param: boolean
        }
        Returns: {
          id_usuario: number
          dni: string
          nombre_completo: string
          correo: string
          img_recibo: string
          codigo_recibo: string
        }[]
      }
      p_verificar_codigo: {
        Args: {
          p_correo: string
          p_codigo_verificacion: string
        }
        Returns: Json
      }
      p_verificar_codigo_usuario_verificado: {
        Args: {
          p_correo: string
          p_codigo_verificacion: string
        }
        Returns: boolean
      }
      p_verificar_correo: {
        Args: {
          p_correo: string
        }
        Returns: boolean
      }
      p_verificar_duplicados: {
        Args: {
          p_dni: string
          p_identificador_unah: string
          p_correo: string
          p_codigo_recibo: string
        }
        Returns: {
          campo_duplicado: string
          valor: string
        }[]
      }
      p_verificar_preregistro: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      prueba: {
        Args: {
          p_nombre: string
          p_apellido: string
          p_descripcion: string
          p_img: string
        }
        Returns: Record<string, unknown>
      }
      traer_recurso_por_conferencia: {
        Args: {
          p_id_conferencia: number
        }
        Returns: {
          id_recurso: number
          nombre_recurso: string
          url_descarga: string
          url_vista_previa: string
          id_conferencia: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
