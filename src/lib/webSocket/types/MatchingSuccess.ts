/**
 * マッチング成功イベントの型
 *
 * @example
 * ```json
    {
        "event": "MatchingSuccess",
        "room_id": "b86800ae-f925-481d-9ac9-3bd618441956",
        "positive_user": {
        "id": "11",
        "name": "User 11"
        },
        "negative_user": {
        "id": "3",
        "name": "User 3"
        },
        "topic_id": "1",
        "theme_name": "education"
    }
 * ```
 */
export type MatchingSuccess = {
  event: "MatchingSuccess"
  room_id: string
  positive_user: {
    id: string
    name: string
  }
  negative_user: {
    id: string
    name: string
  }
  topic_id: string
  theme_name: string
}
