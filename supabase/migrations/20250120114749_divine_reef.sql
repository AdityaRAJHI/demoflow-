/*
  # Combined Setup for Files and Storage

  1. Storage Setup
    - Create ml-demos bucket
    - Set up storage policies for authenticated users
    - Enable public downloads
  
  2. Database Setup
    - Create files table with necessary columns
    - Enable RLS
    - Set up access policies
*/

-- Create the storage bucket if it doesn't exist
DO $$ 
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('ml-demos', 'ml-demos', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Storage policies
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ml-demos');

CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ml-demos' AND auth.uid() = owner);

CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ml-demos');

-- Create files table
CREATE TABLE IF NOT EXISTS public.files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  size bigint NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Files policies
DO $$ 
BEGIN
  CREATE POLICY "Users can insert their own files"
    ON public.files FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can view their own files"
    ON public.files FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can update their own files"
    ON public.files FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can delete their own files"
    ON public.files FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;
