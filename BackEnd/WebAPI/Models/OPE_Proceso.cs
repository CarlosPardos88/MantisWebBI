
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace WebAPI.Models
{

using System;
    using System.Collections.Generic;
    
public partial class OPE_Proceso
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public OPE_Proceso()
    {

        this.OPE_ProgramacionPeriodicaProceso = new HashSet<OPE_ProgramacionPeriodicaProceso>();

        this.OPE_SolicitudEjecucionPorDemandaProceso = new HashSet<OPE_SolicitudEjecucionPorDemandaProceso>();

        this.OPE_Rel_Proceso_ProcesoGestor = new HashSet<OPE_Rel_Proceso_ProcesoGestor>();

        this.OPE_RutaPrerequisitoProceso = new HashSet<OPE_RutaPrerequisitoProceso>();

        this.OPE_ProcesoPrerequisito = new HashSet<OPE_ProcesoPrerequisito>();

        this.OPE_ProcesoPrerequisito1 = new HashSet<OPE_ProcesoPrerequisito>();

        this.OPE_SistemaFuente = new HashSet<OPE_SistemaFuente>();

        this.OPE_ResultadoEjecucionProgramada = new HashSet<OPE_ResultadoEjecucionProgramada>();

    }


    public int Id_Proceso { get; set; }

    public string Desc_Proceso { get; set; }

    public string Cb_ActualAutomaParametros { get; set; }

    public int Id_AreaNegocio { get; set; }

    public string Nombre_Proceso { get; set; }

    public string Cb_UtilizaParametros { get; set; }

    public Nullable<System.DateTime> Fecha_Eliminado { get; set; }

    public Nullable<int> Num_TiempoEstimadoEjec { get; set; }

    public string Cb_RevisionAutomaticaUsuario { get; set; }

    public string Cb_RevisionAutomaticaOperador { get; set; }

    public string Cb_PermitirSolicitudOperador { get; set; }



    public virtual OPE_AreaNegocio OPE_AreaNegocio { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_ProgramacionPeriodicaProceso> OPE_ProgramacionPeriodicaProceso { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    protected virtual ICollection<OPE_SolicitudEjecucionPorDemandaProceso> OPE_SolicitudEjecucionPorDemandaProceso { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_Rel_Proceso_ProcesoGestor> OPE_Rel_Proceso_ProcesoGestor { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_RutaPrerequisitoProceso> OPE_RutaPrerequisitoProceso { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_ProcesoPrerequisito> OPE_ProcesoPrerequisito { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    protected virtual ICollection<OPE_ProcesoPrerequisito> OPE_ProcesoPrerequisito1 { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_SistemaFuente> OPE_SistemaFuente { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<OPE_ResultadoEjecucionProgramada> OPE_ResultadoEjecucionProgramada { get; set; }

}

}
