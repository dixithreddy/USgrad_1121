import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('role_permissions').del();
  await knex('permissions').del();
  await knex('roles').del();

  // Insert roles
  const roles = await knex('roles').insert([
    {
      name: 'admin',
      description: 'System Administrator with full access'
    },
    {
      name: 'agency_admin',
      description: 'Agency Administrator'
    },
    {
      name: 'agency_staff',
      description: 'Agency Staff Member'
    },
    {
      name: 'counselor',
      description: 'Student Counselor'
    }
  ]).returning('*');

  // Insert permissions
  const permissions = await knex('permissions').insert([
    {
      name: 'view_students',
      description: 'View student records',
      category: 'students'
    },
    {
      name: 'manage_students',
      description: 'Manage student records',
      category: 'students'
    },
    // Add more permissions...
  ]).returning('*');

  // Assign permissions to roles
  const adminRole = roles.find(r => r.name === 'admin');
  if (adminRole) {
    await knex('role_permissions').insert(
      permissions.map(p => ({
        role_id: adminRole.id,
        permission_id: p.id
      }))
    );
  }

  // Add more role-permission assignments...
}