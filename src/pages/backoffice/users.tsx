// src\pages\backoffice\users.tsx

import { Layout } from '@/components/layouts';
import UserList from '@/components/backoffice/users/UserList';

const UsersPage = () => {


    return (
        <Layout title="Users - Gym">
            <div>Users List</div>
            <UserList />
        </Layout>
    );
};

// Deberías usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación, antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden almacenarse en caché mediante una CDN para mejorar el rendimiento.
/*
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async (ctx) => {
    const users = await getUsers();
    
    return {
        props: {
            users
        }
    }
}
*/

export default UsersPage;