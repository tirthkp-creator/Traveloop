const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Note: For backend uploads, you typically use a SERVICE_ROLE_KEY for full access,
// but we'll use the provided public key for now which requires proper RLS policies on Supabase.
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (bucket, path, fileBuffer, contentType) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

module.exports = { supabase, uploadImage };
