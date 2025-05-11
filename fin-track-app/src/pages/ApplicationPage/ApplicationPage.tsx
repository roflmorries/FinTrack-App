import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"

export default function ApplicationPage() {

  const user = useAppSelector(state => state.user.currentUser)
  return (
    <>
      <img src={user?.avatar}></img>
      <p>{user?.fullName}</p>
      <p>{user?.email}</p>
    </>
  )
}