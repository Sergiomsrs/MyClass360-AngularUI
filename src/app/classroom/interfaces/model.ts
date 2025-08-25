export interface Root {
    objetivosPorUnidades: Unidad[];
    familia: Familia;
}

export interface Unidad {
    unidad: string;
    fecha: string;
    objetivos: Objetivo[];
    observaciones: string | null;
}

export interface Objetivo {
    area: string;
    objetivoSMART: string;
    numeroDeVeces: number | null;
    numeroDeAciertos: number | null;
    porcentajeDeAciertos: number | null;
}

export interface Familia {
    preocupacionesNecesidades: PreocupacionNecesidad[];
    planificacionPorRutinasFamiliares: PlanificacionRutinas;
    orientacionesRecursos: string;
}

export interface PreocupacionNecesidad {
    intervencionConLaFamilia: string;
    preocupacionNecesidad: string;
    objetivo: string;
    rutina: string | null;
}

export interface PlanificacionRutinas {
    descripcionConducta: string;
    razones: string[];
    prevencion: string;
    accionSiAparece: string;
    habilidadesANuevas: string[];
}
