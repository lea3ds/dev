//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sale.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class AccountUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AccountUser()
        {
            this.AccountValidationRecovery = new HashSet<AccountValidationRecovery>();
        }
    
        public long Id { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public bool Disabled { get; set; }
    
        public virtual AccountPassword AccountPassword { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AccountValidationRecovery> AccountValidationRecovery { get; set; }
    }
}
