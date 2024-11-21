export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',

  // Role Management
  MANAGE_ROLES: 'manage_roles',
  VIEW_ROLES: 'view_roles',
  CREATE_ROLES: 'create_roles',
  EDIT_ROLES: 'edit_roles',
  DELETE_ROLES: 'delete_roles',

  // Student Management
  MANAGE_STUDENTS: 'manage_students',
  VIEW_STUDENTS: 'view_students',
  CREATE_STUDENTS: 'create_students',
  EDIT_STUDENTS: 'edit_students',
  DELETE_STUDENTS: 'delete_students',

  // Application Management
  MANAGE_APPLICATIONS: 'manage_applications',
  VIEW_APPLICATIONS: 'view_applications',
  CREATE_APPLICATIONS: 'create_applications',
  EDIT_APPLICATIONS: 'edit_applications',
  DELETE_APPLICATIONS: 'delete_applications',

  // Document Management
  MANAGE_DOCUMENTS: 'manage_documents',
  VIEW_DOCUMENTS: 'view_documents',
  UPLOAD_DOCUMENTS: 'upload_documents',
  DELETE_DOCUMENTS: 'delete_documents',

  // Financial Management
  MANAGE_FINANCES: 'manage_finances',
  VIEW_FINANCES: 'view_finances',
  CREATE_INVOICES: 'create_invoices',
  PROCESS_PAYMENTS: 'process_payments',

  // Communication
  MANAGE_COMMUNICATIONS: 'manage_communications',
  SEND_EMAILS: 'send_emails',
  VIEW_COMMUNICATIONS: 'view_communications',
  MANAGE_TEMPLATES: 'manage_templates',

  // Reports & Analytics
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  VIEW_ANALYTICS: 'view_analytics',

  // System Settings
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SETTINGS: 'view_settings',
  MANAGE_INTEGRATIONS: 'manage_integrations'
} as const;

export const ROLE_PERMISSIONS = {
  ADMIN: Object.values(PERMISSIONS),
  EMPLOYEE: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_APPLICATIONS,
    PERMISSIONS.EDIT_APPLICATIONS,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.VIEW_COMMUNICATIONS,
    PERMISSIONS.SEND_EMAILS,
    PERMISSIONS.VIEW_REPORTS
  ],
  AGENT_ADMIN: [
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.MANAGE_APPLICATIONS,
    PERMISSIONS.MANAGE_DOCUMENTS,
    PERMISSIONS.VIEW_FINANCES,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_COMMUNICATIONS
  ],
  AGENT_STAFF: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.CREATE_APPLICATIONS,
    PERMISSIONS.VIEW_APPLICATIONS,
    PERMISSIONS.VIEW_DOCUMENTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.VIEW_COMMUNICATIONS,
    PERMISSIONS.SEND_EMAILS
  ]
} as const;