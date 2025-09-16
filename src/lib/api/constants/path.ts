type Path =
  | "LOGIN"
  | "REGISTER"
  | "USER"
  | "LOGOUT"
  | "ROOM_JOIN"
  | "ROOM_LEAVE"

export const PATH: Record<Path, string> = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: "/user",
  LOGOUT: "/logout",
  ROOM_JOIN: "/rooms/join",
  ROOM_LEAVE: "/rooms/leave",
}
