-- Enable Row Level Security (RLS)
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for universities
CREATE POLICY "Universities are viewable by authenticated users"
    ON universities FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Universities are insertable by admins"
    ON universities FOR INSERT
    TO authenticated
    WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Universities are updatable by admins"
    ON universities FOR UPDATE
    TO authenticated
    USING ((auth.jwt() ->> 'role')::text = 'admin')
    WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

-- Create policies for students
CREATE POLICY "Students are viewable by associated agents and admins"
    ON students FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        agent_id = (auth.jwt() ->> 'agent_id')::uuid
    );

CREATE POLICY "Students are insertable by agents and admins"
    ON students FOR INSERT
    TO authenticated
    WITH CHECK (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        agent_id = (auth.jwt() ->> 'agent_id')::uuid
    );

CREATE POLICY "Students are updatable by associated agents and admins"
    ON students FOR UPDATE
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        agent_id = (auth.jwt() ->> 'agent_id')::uuid
    )
    WITH CHECK (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        agent_id = (auth.jwt() ->> 'agent_id')::uuid
    );

-- Create policies for applications
CREATE POLICY "Applications are viewable by associated agents and admins"
    ON applications FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        EXISTS (
            SELECT 1 FROM students
            WHERE students.id = applications.student_id
            AND students.agent_id = (auth.jwt() ->> 'agent_id')::uuid
        )
    );

-- Create policies for documents
CREATE POLICY "Documents are viewable by associated agents and admins"
    ON documents FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        EXISTS (
            SELECT 1 FROM students
            WHERE students.id = documents.student_id
            AND students.agent_id = (auth.jwt() ->> 'agent_id')::uuid
        )
    );

-- Create policies for communications
CREATE POLICY "Communications are viewable by associated agents and admins"
    ON communications FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        EXISTS (
            SELECT 1 FROM students
            WHERE students.id = communications.student_id
            AND students.agent_id = (auth.jwt() ->> 'agent_id')::uuid
        )
    );

-- Create policies for tasks
CREATE POLICY "Tasks are viewable by assigned users and admins"
    ON tasks FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role')::text = 'admin' OR
        assigned_to = auth.uid()::uuid
    );