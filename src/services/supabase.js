import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://padwbfzhmvvmkpjjvxyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZHdiZnpobXZ2bWtwamp2eHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5OTExMTUsImV4cCI6MjAxODU2NzExNX0.B6tsXmsSjkCEiPEGmqT2-ex4WzO2Fnadlw3Rlbm21fY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;