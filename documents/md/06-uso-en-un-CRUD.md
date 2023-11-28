¡Claro! Vamos a agregar estos conceptos a tu aplicación. Primero, hablemos sobre cada uno:

### 1. GetStaticProps:
**Objetivo:** Obtener datos para renderizar la página durante la compilación.

**Uso en tu código:**
```tsx
// pages/users.tsx

import { gymApi } from '../../api';
import { Layout } from '@/components/layouts';
import UserList from '@/components/users/UserList';
import { User, UsersListResponse } from '@/interfaces/users-list';

interface Props {
    users: User[];
}

const UsersPage: NextPage<Props> = ({ users }) => {
    
    return (
        <Layout title="Users - Gym">
            <div>Users List</div>
            <UserList users={users} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await gymApi.get<UsersListResponse>('/gym/users');
    return {
        props: {
            users: data.users
        }
    };
};

export default UsersPage;
```

### 2. GetStaticPaths:
**Objetivo:** Especificar las rutas que deben ser pre-renderizadas.

**Uso:** En este caso, no necesitas GetStaticPaths, ya que parece que tu página no tiene rutas dinámicas. Esta función se utiliza cuando tienes páginas con rutas dinámicas que dependen de datos específicos.

### 3. Incremental Static Regeneration:
**Objetivo:** Actualizar páginas pre-renderizadas sin tener que volver a construir toda la aplicación.

**Uso:** Añadiremos la opción `revalidate` a `getStaticProps` para habilitar la regeneración incremental.

```tsx
export const getStaticProps: GetStaticProps = async () => {
    const { data } = await gymApi.get<UsersListResponse>('/gym/users');
    return {
        props: {
            users: data.users
        },
        revalidate: 60, // Regenerar cada 60 segundos
    };
};
```

### 4. Incremental Static Generation:
**Objetivo:** Mejorar el rendimiento al regenerar páginas automáticamente.

**Uso:** Al agregar `revalidate` en `getStaticProps`, estás utilizando Incremental Static Generation. Esto significa que cada vez que alguien visita la página después de que haya pasado el tiempo especificado (60 segundos en el ejemplo), la página se regenerará con nuevos datos si hay disponibles.

Recuerda ajustar el valor de `revalidate` según tus necesidades y la frecuencia con la que esperas que cambien los datos.

Con estas adiciones, tu aplicación ahora aprovechará la pre-renderización, la regeneración incremental y la generación estática incremental para mejorar la velocidad y la frescura de tus datos.