'use server'

import { clerkClient } from "@clerk/nextjs/server"
import { parseStringify } from "../utils"
import { liveblocks } from "../liveblocks"

export const getClerkUser = async ({
  userIds
}: {
  userIds: string[]
}) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds
    })

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }))

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email))

    return parseStringify(sortedUsers)
  } catch (error) {
    console.log("Erorr fetching users: ", error)
  }
}

export const getDocumentUsers = async ({
  roomId,
  currnetUser,
  text
}: {
  roomId: string,
  currnetUser: string,
  text: string
}) => {
  try {
    const room = await liveblocks.getRoom(roomId)

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currnetUser)

    if (text.length) {
      const lowerCaseText = text.toLowerCase()

      const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))


      return parseStringify(filteredUsers)
    }

    return parseStringify(users)
  } catch (error) {
    console.log(error)
  }
}