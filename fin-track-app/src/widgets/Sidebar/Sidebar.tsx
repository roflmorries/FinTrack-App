import { Avatar, Button, Modal, Select } from "antd"
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userLogOut } from "../../entities/user/model/userThunks";
import TransactionForm from "../../features/transactions/TransactionForm";
import { useState } from "react";
import { selectFreeBalance } from "../../entities/transactions/model/selectBalance";
import { exportTransactionsToCSV, exportTransactionsToPDF } from "../../shared/lib/export/exportTransactions";
import { SelectAllTransactions } from "../../entities/transactions/model/transactionsSelectors";
import { useTranslation } from 'react-i18next';


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
  // const balance = useAppSelector(selectBalance);
  const freeBalance = useAppSelector(selectFreeBalance)
  const transactions = useAppSelector(SelectAllTransactions)
  const { i18n } = useTranslation();
  const { t } = useTranslation();


  const handleUserLogOut = () => {
    dispatch(userLogOut());
  }

  const handleChangeLanguage = (values: string) => {
    i18n.changeLanguage(values)
  }

  const user = useAppSelector(state => state.user.currentUser);
  return (
    <div className={className}>
      <div>
         <Avatar size={92} icon={<img src={user?.avatar}></img>} />
         <p>{user?.fullName}</p>
         <p>Balance: ${freeBalance}</p>
      </div>
      <Select
      defaultValue="en"
      style={{ width: 120 }}
      onChange={handleChangeLanguage}
      options={[
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
        { value: 'ua', label: 'Ukrainian' },
      ]}
      />
      <StyledNav className="sidebar__navigation">
        <NavLink to='/dashboard' end>
          {t('dashboard')}
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
        <NavLink to='/dashboard/ai-assistant'>
          Ai Assistant
        </NavLink>
      </StyledNav>
      <StyledButtonContainer>
        <Button onClick={() => exportTransactionsToCSV(transactions)}>Export transactions to CSV</Button>
        <Button onClick={() => exportTransactionsToPDF(transactions)}>Export transactions to PDF</Button>
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