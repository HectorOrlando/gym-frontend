// src\pages\users.tsx

import { gymApi } from '../api'
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

// Deberías usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación, antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden almacenarse en caché mediante una CDN para mejorar el rendimiento.
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