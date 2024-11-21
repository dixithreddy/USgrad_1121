export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  AGENT_ADMIN: 'agent_admin',
  AGENT_STAFF: 'agent_staff'
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.AGENT_ADMIN]: [
    'manage_agency',
    'view_agency_metrics',
    'manage_agency_staff',
    'view_agency_applications',
    'create_applications',
    'edit_applications',
    'view_agency_finances',
    'view_commission_reports',
    'view_invoices',
    'manage_agency_documents',
    'upload_documents',
    'manage_communications',
    'send_messages',
    'view_agency_reports'
  ],
  [ROLES.AGENT_STAFF]: [
    // Application Management
    'create_applications',
    'view_assigned_applications',
    'edit_assigned_applications',
    
    // Student Management
    'view_assigned_students',
    'edit_assigned_students',
    
    // Document Management
    'upload_documents',
    'view_documents',
    
    // Communication
    'send_messages',
    'view_communications',
    
    // Basic Reports
    'view_basic_reports'
  ]
} as const;