// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import UserComponent from './UserComponent';
//
// export default async function UserCookies() {
//   const supabase = createServerComponentClient({ cookies });
//
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   return (
//     <div>
//       <UserComponent session={session} />
//     </div>
//   );
// }
