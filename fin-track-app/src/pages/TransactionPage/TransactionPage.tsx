import styled from "styled-components"
import TransactionForm from "../../features/transactions/TransactionForm"

const Layout = styled.div`
  background-color: #141414;
  height: 96%;
  border-radius: 24px;
  padding: 1px;
  margin: 20px;
`

export default function TransactionPage() {
  return (
    <Layout>
      <div>TransactionPage</div>
      <TransactionForm/>
    </Layout>
  )
}