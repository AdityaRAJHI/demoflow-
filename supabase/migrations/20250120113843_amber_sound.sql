/*
  # Create files and models tables

  1. New Tables
    - `files`
      - `id` (uuid, primary key)
      - `name` (text) - Original filename
      - `size` (bigint) - File size in bytes
      - `type` (text) - MIME type
      - `url` (text) - Storage URL
      - `user_id` (uuid) - Reference to auth.users
      - `created_at` (timestamp)
    
    - `models`
      - `id` (uuid, primary key)
      - `name` (text) - Model name
      - `description` (text)
      - `input_type` (text) - Type of input (image, text, etc)
      - `output_type` (text) - Type of output
      - `user_id` (uuid) - Reference to auth.users
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own files and models
*/

-- Create files table
CREATE TABLE files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  size bigint NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create models table
CREATE TABLE models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  input_type text NOT NULL,
  output_type text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;

-- Files policies
CREATE POLICY "Users can insert their own files"
  ON files FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own files"
  ON files FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own files"
  ON files FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files"
  ON files FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Models policies
CREATE POLICY "Users can insert their own models"
  ON models FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own models"
  ON models FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own models"
  ON models FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own models"
  ON models FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);
