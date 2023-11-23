// pages/users.tsx

import { Layout } from '@/components/layouts';
import UserList from '@/components/users/UserList';

const UsersPage = () => {

    return (
        <Layout title="Users - Gym">
            <div>Users List</div>
            {/* Agrega aquí el contenido de la página Users */}
            <UserList />
        </Layout>
    );
};

export default UsersPage;