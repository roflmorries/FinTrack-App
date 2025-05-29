import { Avatar, Button, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userLogOut } from "../../entities/user/model/userThunks";
import TransactionForm from "../../features/transactions/TransactionForm";
import { useState } from "react";
import { selectBalance } from "../../entities/transactions/model/selectBalance";

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

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 20px;

  .ant-btn {
    background: none;
    border: none;
    color: white;
    box-shadow: none;
  }
`

type SidebarProps = {
  className?: string,
}

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useAppDispatch();
  // const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const balance = useAppSelector(selectBalance);

  const handleUserLogOut = () => {
    dispatch(userLogOut());
  }

  const user = useAppSelector(state => state.user.currentUser);
  return (
    <div className={className}>
      <div>
         <Avatar size={92} icon={<img src={user?.avatar}></img>} />
         <p>{user?.fullName}</p>
         <p>Balance: ${balance}</p>
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
        <NavLink to='/dashboard/goals'>
          Goals
        </NavLink>
      </StyledNav>
      <StyledButtonContainer>
        <Button onClick={() => setModal2Open(true)}>+ Add Transaction</Button>
        <Button onClick={handleUserLogOut}>LogOut</Button>
      </StyledButtonContainer>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
      >
        <TransactionForm onSave={() => setModal2Open(false)}/>
      </Modal>
    </div>
  )
}