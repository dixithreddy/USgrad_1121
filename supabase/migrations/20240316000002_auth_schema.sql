-- Create auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create roles table first
CREATE TABLE auth.roles (
    role TEXT PRIMARY KEY,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create roles_permissions table
CREATE TABLE auth.roles_permissions (
    role TEXT REFERENCES auth.roles(role) ON DELETE CASCADE,
    permission TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (role, permission)
);

-- Create users table
CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'agent_staff' REFERENCES auth.roles(role),
    agent_id UUID REFERENCES public.agents(id),
    reset_password_token TEXT,
    reset_password_sent_at TIMESTAMPTZ,
    remember_created_at TIMESTAMPTZ,
    sign_in_count INTEGER DEFAULT 0,
    current_sign_in_at TIMESTAMPTZ,
    last_sign_in_at TIMESTAMPTZ,
    current_sign_in_ip TEXT,
    last_sign_in_ip TEXT,
    confirmation_token TEXT,
    confirmed_at TIMESTAMPTZ,
    confirmation_sent_at TIMESTAMPTZ,
    unconfirmed_email TEXT,
    failed_attempts INTEGER DEFAULT 0,
    locked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE auth.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create refresh_tokens table
CREATE TABLE auth.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default roles
INSERT INTO auth.roles (role, description) VALUES
    ('admin', 'System Administrator with full access'),
    ('agent_admin', 'Agency Administrator'),
    ('agent_staff', 'Agency Staff Member'),
    ('counselor', 'Student Counselor');

-- Insert default permissions for roles
INSERT INTO auth.roles_permissions (role, permission) VALUES
    ('admin', 'all:read'),
    ('admin', 'all:write'),
    ('agent_admin', 'agency:read'),
    ('agent_admin', 'agency:write'),
    ('agent_staff', 'students:read'),
    ('agent_staff', 'applications:write'),
    ('counselor', 'students:read'),
    ('counselor', 'documents:write');

-- Create indexes
CREATE INDEX idx_users_email ON auth.users(email);
CREATE INDEX idx_users_agent ON auth.users(agent_id);
CREATE INDEX idx_users_role ON auth.users(role);
CREATE INDEX idx_sessions_user ON auth.sessions(user_id);
CREATE INDEX idx_sessions_token ON auth.sessions(token);
CREATE INDEX idx_refresh_tokens_user ON auth.refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON auth.refresh_tokens(token);

-- Create updated_at triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON auth.sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_refresh_tokens_updated_at
    BEFORE UPDATE ON auth.refresh_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.roles_permissions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
    ON auth.users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
    ON auth.users FOR SELECT
    USING ((SELECT role FROM auth.users WHERE id = auth.uid()) = 'admin');

-- Sessions policies
CREATE POLICY "Users can view their own sessions"
    ON auth.sessions FOR SELECT
    USING (auth.uid() = user_id);

-- Refresh tokens policies
CREATE POLICY "Users can view their own refresh tokens"
    ON auth.refresh_tokens FOR SELECT
    USING (auth.uid() = user_id);

-- Roles policies
CREATE POLICY "Roles are viewable by authenticated users"
    ON auth.roles FOR SELECT
    TO authenticated
    USING (true);

-- Roles permissions policies
CREATE POLICY "Role permissions are viewable by authenticated users"
    ON auth.roles_permissions FOR SELECT
    TO authenticated
    USING (true);