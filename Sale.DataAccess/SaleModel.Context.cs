﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SaleContext : DbContext
    {
        public SaleContext()
            : base("name=SaleContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AccountPassword> AccountPassword { get; set; }
        public virtual DbSet<AccountUser> AccountUser { get; set; }
        public virtual DbSet<AccountValidationRecovery> AccountValidationRecovery { get; set; }
        public virtual DbSet<AccountValidationSignin> AccountValidationSignin { get; set; }
        public virtual DbSet<Income> Income { get; set; }
        public virtual DbSet<IncomeCategory> IncomeCategory { get; set; }
        public virtual DbSet<IncomePending> IncomePending { get; set; }
        public virtual DbSet<OperationType> OperationType { get; set; }
        public virtual DbSet<Payment> Payment { get; set; }
        public virtual DbSet<PaymentCategory> PaymentCategory { get; set; }
        public virtual DbSet<PaymentPending> PaymentPending { get; set; }
        public virtual DbSet<VersionTable> VersionTable { get; set; }
        public virtual DbSet<Waytopay> Waytopay { get; set; }
        public virtual DbSet<WaytopayType> WaytopayType { get; set; }
    }
}