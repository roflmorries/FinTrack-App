import { Avatar, Button } from "antd"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userLogOut } from "../../entities/user/model/userThunks";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
  a {
    color: white;
    text-decoration: none;
  }
  .active {
    color: purple;
  }
`

type SidebarProps = {
  className?: string,
}

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useAppDispatch();

  const handleUserLogOut = () => {
    dispatch(userLogOut());
  }

  const user = useAppSelector(state => state.user.currentUser);
  return (
    <div className={className}>
      <div>
         <Avatar size={92} icon={<img src={user?.avatar}></img>} />
         <p>{user?.fullName}</p>
         <p>Balance must be here..</p>
      </div>
      <StyledNav className="sidebar__navigation">
        <NavLink to='/dashboard' end>
          Dashboard
        </NavLink>
        <NavLink to='/dashboard/transactions'>
          Transactions
        </NavLink>
        <NavLink to='/dashboard/categories'>
          Categories
        </NavLink>
      </StyledNav>
      <div>
        <Button onClick={handleUserLogOut}>LogOut</Button>
      </div>
    </div>
  )
}