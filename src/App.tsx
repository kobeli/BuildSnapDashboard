import React, { useState } from 'react';
import { Button, Layout, Upload, Card, message, Typography } from 'antd';
import type { UploadProps } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

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
      <Content style={{ padding: '16px' }}>
        <Upload {...uploadProps}>
          <Button type="primary">Upload Image</Button>
        </Upload>
        
        {projectData && (
          <Card 
            style={{ 
              marginTop: 20,
              maxWidth: '100%'
            }}
          >
            <Title level={5}>{projectData.projectTitle}</Title>
            
            <div style={{ marginTop: 16 }}>
              <Text strong>Address: </Text>
              <Text>{projectData.location.address}</Text>
            </div>

            <div style={{ marginTop: 8 }}>
              <Text strong>Developer: </Text>
              <Text>{projectData.developers[0].name}</Text>
            </div>

            <div style={{ marginTop: 8 }}>
              <Text strong>Contact: </Text>
              <Text>{projectData.developers[0].contact}</Text>
            </div>

            <div style={{ 
              marginTop: 16,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <Text strong>Permit Issued: </Text>
                <Text>{projectData.permitIssuedDate}</Text>
              </div>
              <div>
                <Text strong>Expected Completion: </Text>
                <Text>{projectData.expectedCompletionDate}</Text>
              </div>
            </div>
          </Card>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2025</Footer>
    </Layout>
  );
}

export default App;