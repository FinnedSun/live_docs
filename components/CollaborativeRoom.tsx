"use client"

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider
} from '@liveblocks/react/suspense'
import { Header } from './Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'
import { ActiveCollaborator } from './ActiveCollaborators'

export const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className='collaborative-room'>
          <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
              <p className='document-title'>Shere</p>
            </div>
            <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborator />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}
