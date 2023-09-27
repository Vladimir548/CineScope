// 'use client';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
//
// export const getUserSession = {
//   async getUser() {
//     const supabase = createServerComponentClient({ cookies });
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     return session;
//   },
// };
