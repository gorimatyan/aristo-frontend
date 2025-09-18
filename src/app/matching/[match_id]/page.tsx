import { MatchingPage } from "./MatchingPage"
export default async function Matching({
  params,
}: {
  params: { match_id: string }
}) {
  const { match_id } = await params
  return <MatchingPage match_id={match_id} />
}
