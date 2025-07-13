import Sidebar from "../../widgets/Sidebar/Sidebar";
import styled from 'styled-components';
import { Layout } from 'antd';
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const { Content, Sider } = Layout;

const CustomLayout = styled(Layout)`
  .ant-layout {
    height: 100vh;
  }
`;

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 }
};

export default function ApplicationPage() {
  const location = useLocation();

  return (
    <CustomLayout>
      <Sider width={350} style={{ background: "#262626" }}>
        <Sidebar/>
      </Sider>
      <Layout style={{ background: "#262626" }}>
        <Content>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} {...fadeTransition}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </CustomLayout>
  );
}