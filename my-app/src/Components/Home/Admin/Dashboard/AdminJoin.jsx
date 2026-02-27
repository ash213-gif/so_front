import AdminSide from '../Sidebar/AdminSide';
import { Outlet } from 'react-router-dom';

export default function AdminJoin() {
  return (
    <>
      <div className='flex'>
        <AdminSide />
        <div style={{ flex: 1, width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
