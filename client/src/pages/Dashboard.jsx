import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParamas = new URLSearchParams(location.search);
    const tabFromUrl = urlParamas.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Side Bar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* Users */}
      {tab === 'users' && <DashUsers />}
      {/* Comments */}
      {tab === 'comments' && <DashComment />}
    </div>
  )
}
