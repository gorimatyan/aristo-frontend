"use client"
import { configureEcho } from "@laravel/echo-react"
import axios from "axios"
import type { Channel, ChannelAuthorizationCallback } from "pusher-js"
import { useEffect } from "react"

export const EchoProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      configureEcho({
        broadcaster: "pusher",
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        // forceTLS: true,
        wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
        wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
        wssPort: process.env.NEXT_PUBLIC_PUSHER_PORT,
        enabledTransports: ["ws", "wss"],
        authorizer: (channel: Channel) => {
          return {
            authorize: (
              socketId: string,
              callback: ChannelAuthorizationCallback,
            ) => {
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/api/broadcasting/auth`,
                  {
                    socket_id: socketId,
                    channel_name: channel.name,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  },
                )
                .then((response) => {
                  callback(null, response.data)
                })
                .catch((error: Error) => {
                  callback(error, null)
                })
            },
          }
        },
      })
    }
  }, [])

  return <>{children}</>
}
