import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

export default function Loader() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  )
}