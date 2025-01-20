/*
  # Create storage bucket for ML demos

  1. New Storage
    - Create 'ml-demos' bucket for storing uploaded files
  2. Security
    - Enable authenticated users to upload files
    - Allow public access for downloads
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('ml-demos', 'ml-demos', true);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ml-demos');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ml-demos' AND auth.uid() = owner);

-- Allow public downloads
CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ml-demos');
