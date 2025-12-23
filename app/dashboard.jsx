"use client";

import { Layout } from "antd";
import Sidebar from "../components/Layout/Sidebar";
import HeaderBar from "../components/Layout/HeaderBar";

const { Content, Footer } = Layout;

export default function Dashboard({ children }) {
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <HeaderBar />

        <Content style={{  }}>
          <div
            style={{
              // padding: 24,
              background: "white",
              borderRadius: 8,
              minHeight: "80vh",
            }}
          >
            {children}
          </div>
        </Content>

        {/* <Footer style={{ textAlign: "center" }}>
          Next.js Dashboard ©{new Date().getFullYear()}
        </Footer> */}
      </Layout>
    </Layout>
  );
}
