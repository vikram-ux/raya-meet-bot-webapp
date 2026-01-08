import React, { useState } from 'react';
import { Tabs, Input, Button, Flex, Tag } from 'antd';
import {
  SearchOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import MembersTab from './MembersTab';
import UserGroupsTab from './UserGroupsTab';

const TeamNav = () => {
  const [activeTab, setActiveTab] = useState('members');

  const tabExtra = (
    <Flex gap={12} align="center">
      {activeTab === 'members' && (
        <Input
          allowClear
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          style={{ width: 240 }}
        />
      )}

      <Button
        type="primary"
        icon={<UserAddOutlined />}
        disabled={activeTab === 'groups'}
      >
        Invite Teammates
      </Button>

      <Button type="text" icon={<SettingOutlined />} />
    </Flex>
  );

  return (
    <div style={{ background: '#fff', padding: 34}}>
      <Tabs
      // style={{ backgroundColor: "red"}}
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={tabExtra}
        items={[
          {
            key: 'members',
            label: 'Members · 1',
            children: <MembersTab />,
          },
          {
            key: 'groups',
            label: (
              <Flex gap={6} align="center">
                User Groups
                <Tag color="magenta">NEW</Tag>
              </Flex>
            ),
            children: <UserGroupsTab />,
          },
        ]}

      />
    </div>
  );
};

export default TeamNav;
