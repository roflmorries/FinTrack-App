import { Avatar } from "antd"
import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"

type SidebarProps = {
  className?: string,
}

export default function Sidebar({ className }: SidebarProps) {

  const user = useAppSelector(state => state.user.currentUser);
  return (
    <div className={className}>
      <div>
         <Avatar size={92} icon={<img src={user?.avatar}></img>} />
         <p>{user?.fullName}</p>
         <p>Balance must be here..</p>
      </div>
    </div>
  )
}