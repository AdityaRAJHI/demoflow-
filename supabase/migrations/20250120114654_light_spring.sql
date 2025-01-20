/*
  # Create database schema for ML demos

  1. New Tables
    - `files` table for storing file metadata
      - id: UUID primary key
      - name: File name
      - size: File size in bytes
      - type: MIME type
      - url: Public URL
      - user_id: Reference to auth.users
      - created_at: Timestamp
    
  2. Security
    - Enable RLS on files table
    - Policies for authenticated users to manage their files
*/

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
