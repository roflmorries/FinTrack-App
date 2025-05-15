import Sidebar from "../../widgets/Sidebar/Sidebar"
import styled from 'styled-components'
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const CustomLayout = styled(Layout)`
  .ant-layout {
    height: 100vh;
  }
`;


export default function ApplicationPage() {
  return (
    <CustomLayout>
      <Sider width={350} style={{ background: "#262626" }}>
        <Sidebar/>
      </Sider>
      <Layout style={{ background: "#262626" }}>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </CustomLayout>
  )
}