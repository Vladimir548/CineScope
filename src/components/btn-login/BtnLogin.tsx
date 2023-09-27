// 'use client';
//
// import { BiLogIn } from 'react-icons/bi';
// import { Modal, ModalBody, ModalContent, Tooltip, useDisclosure } from '@nextui-org/react';
// import AuthForm from '@/app/auth/auth-form';
// import React from 'react';
// import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
//
// export default function BtnLogin() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const { isActive } = useTypedSelector((state) => state.sidebar);
//   return (
//     <div>
//       <Tooltip
//         isDisabled={isActive ? true : false}
//         showArrow={true}
//         content={'Войти'}
//         color="default"
//         placement={'right'}
//       >
//         <button
//           className={
//             'flex items-center ease-in-out text-center justify-center  duration-400 h-[50px] w-full rounded-lg  hover:bg-[#27272a]'
//           }
//           onClick={onOpen}
//         >
//           <div className={'flex   items-center px-2'}>
//             <BiLogIn size={28} />
//             <p className={isActive ? 'flex' : 'hidden'}>Войти</p>
//           </div>
//         </button>
//       </Tooltip>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           <ModalBody>
//             <AuthForm />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
