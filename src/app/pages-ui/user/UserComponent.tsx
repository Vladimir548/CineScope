// 'use client';
// import React, { useCallback, useEffect, useState } from 'react';
//
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import Link from 'next/link';
// import { User } from '@nextui-org/user';
// import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
// import BtnLogin from '@/components/btn-login/BtnLogin';
// import { Tooltip } from '@nextui-org/react';
//
// export default function UserComponent({ session }: { session?: Session | null }) {
//   const supabase = createClientComponentClient();
//   const [loading, setLoading] = useState(true);
//
//   const [username, setUsername] = useState<string | null>(null);
//   const [avatar_url, setAvatarUrl] = useState<string | null>(null);
//   const user = session?.user;
//   const { isActive } = useTypedSelector((state) => state.sidebar);
//   const getProfile = useCallback(async () => {
//     try {
//       setLoading(true);
//
//       let { data, error, status } = await supabase
//         .from('profiles')
//         .select(` username, avatar_url`)
//         .eq('id', '808fb205-7bf7-4516-bbe1-49b654142cb1')
//         .single();
//
//       if (error && status !== 406) {
//         throw error;
//       }
//
//       if (data) {
//         setUsername(data.username);
//         setAvatarUrl(data.avatar_url);
//       }
//     } catch (error) {
//       alert('Ошибка при получение данных!');
//     } finally {
//       setLoading(false);
//     }
//   }, [user, supabase]);
//
//   useEffect(() => {
//     getProfile();
//   }, [user, getProfile]);
//   return (
//     <div>
//       {user ? (
//         <Tooltip
//           isDisabled={isActive ? true : false}
//           showArrow={true}
//           content={'Аккаунт'}
//           color="default"
//           placement={'right'}
//         >
//           <Link
//             className={
//               'flex items-center ease-in-out text-center justify-center  duration-400 h-[50px] w-full rounded-lg  hover:bg-[#27272a]'
//             }
//             href={'/account'}
//           >
//             <User
//               name={isActive ? username : ''}
//               avatarProps={{
//                 src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
//               }}
//             />
//           </Link>
//         </Tooltip>
//       ) : (
//         <>
//           <BtnLogin />
//         </>
//       )}
//     </div>
//   );
// }
