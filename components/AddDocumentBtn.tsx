'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

export const AddDocumentBtn = ({
  userId,
  email
}: AddDocumentBtnProps) => {
  const router = useRouter()

  const addDocumentHadler = async () => {
    try {
      const room = await createDocument({ userId, email })

      if (room) router.push(`/documents/${room.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      type="submit"
      onClick={addDocumentHadler}
      className='gradient-blue flex gap-1 shadow-md'
    >
      <Image
        src={"/assets/icons/add.svg"}
        alt='add'
        width={24}
        height={24}
      />
      <p className='hidden sm:block'>Create document</p>
    </Button>
  )
}
