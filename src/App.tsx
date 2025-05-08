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
  structuralEngineers: Array<{ name: string; contact: string }>;
  meEngineers: Array<{ name: string; contact: string }>;
  quantitySurveyors: Array<{ name: string; contact: string }>;
  builders: Array<{ name: string; contact: string }>;
  permitIssuedDate: string;
  expectedCompletionDate: string;
  govContacts: {
    neaApp: string;
    bcaHotline: string;
    momHotline: string;
    momWebsite: string;
    neaHotline: string;
  };
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
          <Card style={{ marginTop: 20 }}>
            <Title level={4}>{projectData.projectTitle}</Title>
            
            <Card type="inner" title="Location Details" style={{ marginTop: 16 }}>
              <div><Text strong>Address: </Text><Text>{projectData.location.address}</Text></div>
              <div style={{ marginTop: 8 }}><Text strong>Planning Area: </Text><Text>{projectData.location.planningArea}</Text></div>
              <div style={{ marginTop: 8 }}><Text strong>Land Lots: </Text><Text>{projectData.location.landLots.join(', ')}</Text></div>
            </Card>

            <Card type="inner" title="Project References" style={{ marginTop: 16 }}>
              {projectData.projectRefs.map((ref, index) => (
                <div key={index}>{ref}</div>
              ))}
            </Card>

            <Card type="inner" title="Key Contacts" style={{ marginTop: 16 }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <ContactSection title="Developers" contacts={projectData.developers} />
                <ContactSection title="Architects" contacts={projectData.architects} />
                <ContactSection title="Structural Engineers" contacts={projectData.structuralEngineers} />
                <ContactSection title="M&E Engineers" contacts={projectData.meEngineers} />
                <ContactSection title="Quantity Surveyors" contacts={projectData.quantitySurveyors} />
                <ContactSection title="Builders" contacts={projectData.builders} />
              </div>
            </Card>

            <Card type="inner" title="Government Contacts" style={{ marginTop: 16 }}>
              <div><Text strong>BCA Hotline: </Text><Text>{projectData.govContacts.bcaHotline}</Text></div>
              <div><Text strong>MOM Hotline: </Text><Text>{projectData.govContacts.momHotline}</Text></div>
              <div><Text strong>NEA Hotline: </Text><Text>{projectData.govContacts.neaHotline}</Text></div>
              <div><Text strong>NEA App: </Text><Text>{projectData.govContacts.neaApp}</Text></div>
              <div><Text strong>MOM Website: </Text><a href={projectData.govContacts.momWebsite} target="_blank" rel="noopener noreferrer">Report WSH Issues</a></div>
            </Card>

            <Card type="inner" title="Project Timeline" style={{ marginTop: 16 }}>
              <div><Text strong>Permit Issued: </Text><Text>{projectData.permitIssuedDate}</Text></div>
              <div style={{ marginTop: 8 }}><Text strong>Expected Completion: </Text><Text>{projectData.expectedCompletionDate}</Text></div>
            </Card>
          </Card>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2025</Footer>
    </Layout>
  );
}

// 辅助组件用于显示联系人信息
const ContactSection: React.FC<{
  title: string;
  contacts: Array<{ name: string; contact: string }>;
}> = ({ title, contacts }) => (
  <div>
    <Text strong>{title}</Text>
    {contacts.map((contact, index) => (
      <div key={index} style={{ marginLeft: 16, marginTop: 4 }}>
        <div>{contact.name}</div>
        <div style={{ color: '#666' }}>{contact.contact}</div>
      </div>
    ))}
  </div>
);

export default App;