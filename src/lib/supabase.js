import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = process.env.REACT_APP_ANON_KEY
const SUPABASE_URL = process.env.REACT_APP_PROJECT_URL
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

