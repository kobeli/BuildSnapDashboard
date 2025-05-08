import React, { useState } from 'react';
import { Button, Layout, Upload, Table, message } from 'antd';
import type { UploadProps } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

interface ProjectData {
  id: number;
  projectTitle: string;
  location: {
    address: string;
    landLots: string[];
    planningArea: string;
  };
  projectRefs: string[];
  developers: Array<{ name: string; contact: string }>;
  architects: Array<{ name: string; contact: string }>;
  permitIssuedDate: string;
  expectedCompletionDate: string;
}

function App() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const columns = [
    {
      title: 'Project Title',
      dataIndex: 'projectTitle',
      key: 'projectTitle',
    },
    {
      title: 'Address',
      dataIndex: ['location', 'address'],
      key: 'address',
    },
    {
      title: 'Developer',
      dataIndex: ['developers', 0, 'name'],
      key: 'developer',
    },
    {
      title: 'Permit Issued Date',
      dataIndex: 'permitIssuedDate',
      key: 'permitIssuedDate',
    },
    {
      title: 'Expected Completion',
      dataIndex: 'expectedCompletionDate',
      key: 'expectedCompletionDate',
    },
  ];

  const uploadProps: UploadProps = {
    name: 'image',
    action: 'https://buildsnapmain-e7c6bqfxbpc5gzb6.southeastasia-01.azurewebsites.net/api/upload',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} upload successful`);
        setProjectData(info.file.response.data);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: 20 }}>Dashboard</Header>
      <Content style={{ padding: '24px' }}>
        <Upload {...uploadProps}>
          <Button type="primary">Upload Image</Button>
        </Upload>
        
        {projectData && (
          <Table 
            dataSource={[projectData]} 
            columns={columns} 
            style={{ marginTop: 20 }}
            pagination={false}
          />
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2025</Footer>
    </Layout>
  );
}

export default App;