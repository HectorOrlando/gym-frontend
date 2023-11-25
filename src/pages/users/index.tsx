// pages/users.tsx

import { gymApi } from '../../api'
import { Layout } from '@/components/layouts';
import UserList from '@/components/users/UserList';
import { User, UsersListResponse } from '@/interfaces/users-list';

interface Props {
    users: User[]
}

const UsersPage: NextPage<Props> = ({ users }) => {
    
    return (
        <Layout title="Users - Gym">
            <div>Users List</div>
            <UserList users={users} />
        </Layout>
    );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await gymApi.get<UsersListResponse>('/gym/users');
    return {
        props: {
            users: data.users
        }
    }
}

export default UsersPage;