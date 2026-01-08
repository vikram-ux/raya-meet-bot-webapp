import React, { useState } from 'react';
import { Avatar, Tag, Space, Typography, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const members = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@company.com',
    role: 'Admin',
  },
//   {
//     id: 2,
//     name: 'Aarav Sharma',
//     email: 'aarav@company.com',
//     role: 'Admin',
//   },
];

const filterItems = [
  { key: 'all', label: 'All Members' },
  { key: 'active', label: 'Active Members' },
  { key: 'deactivated', label: 'Deactivated Members' },
];

const MembersTab = () => {
  const [filter, setFilter] = useState('All Members (1)');

  return (
    <>
      {/* Top Filter */}
      <div style={{ marginTop: 30, marginBottom: 25 }}>
        <Dropdown
          menu={{
            items: filterItems,
            onClick: ({ key }) => {
              const selected = filterItems.find(i => i.key === key);
              setFilter(selected.label);
            },
          }}
        >
          <Space style={{ cursor: 'pointer', color: '#6b7280', fontWeight: 500,}}>
            {filter}
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Dropdown>
      </div>

      {/* Members */}
      <Space orientation="vertical" style={{ width: '100%'}} size={16}>
        {members.map((item) => (
          <Space key={item.id} align="start" style={{margin: 10}}>
            <Avatar style={{ backgroundColor: '#6366f1' }}>
              {item.name[0]}
            </Avatar>

            <div>
              <Space>
                <Text strong>{item.name}</Text>
                <Tag color="purple">{item.role}</Tag>
              </Space>
              <div style={{ color: '#6b7280' }}>{item.email}</div>
            </div>
          </Space>
        ))}
      </Space>
    </>
  );
};

export default MembersTab;
