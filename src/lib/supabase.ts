import { createClient } from '@supabase/supabase-js'

const createSupabaseClient = () => createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

const getSupabaseClient = () => {
  if (process.env.NODE_ENV === 'production') return createSupabaseClient()
  if (!global.supabase) global.supabase = createSupabaseClient()
  return global.supabase
}

const supabase = getSupabaseClient()
export default supabase
