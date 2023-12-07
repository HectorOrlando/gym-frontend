Tengo los siguientes archivos

/**** api ***/
// src\pages\api\gymApi.ts

import axios from 'axios';
import { User } from '@/types/user';

export const gymApi = axios.create({
    baseURL: 'https://gym-backend.upaje.com',
});

export const getUsers = async () => {
    const response = await gymApi.get('/gym/users');
    return response.data.users;
};

export const createUser = async (userData: User) => {
    const response = await gymApi.post('/gym/user', userData);
    return response.data;
};

export const updateUser = async (userId: string, userData: User) => {
    const response = await gymApi.put(`/gym/user/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await gymApi.delete(`/gym/user/${userId}`);
    return response.data;
};


/***** components  ****///

// src\components\layouts\Layout.tsx

import { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Box } from '@mui/material'
import Navbar from '../ui/Navbar';


interface Props {
    title?: string;
    children: ReactNode;
}

export const Layout: FC<Props> = ({ title = 'Gym', children }) => {
    return (
        <Box>
            <Head>
                <title>{title || 'Skeleton-Next'}</title>
                <meta name='author' content='Hector Orlando' />
                <meta name='description' content={`Informanción sobre la página ${title}`} />
                <meta name='keywords' content={`${title}, Next.js, TypeScript, Node.js`} />
            </Head>
            <Navbar />
            <main style={{
                padding: '30px 20px 200px 20px'
            }}>
                {children}
            </main>
        </Box>
    )
}


// src\components\ui\Navbar.tsx

import * as React from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['Users', 'Exercises', 'ExercisesLog', 'Upaje'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const router = useRouter();
    
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Versión PC y Table  */}

                    <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Gym
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <a key={page} href={(page !== 'Upaje') ? `/${page.toLowerCase()}` : `https://upaje.com/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography
                                        textAlign="center"
                                        onClick={() => router.push(`/${page.toLowerCase()}`)}
                                        sx={{
                                            margin: 0,
                                            padding: '12px',
                                            color: 'black',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </a>
                            ))}
                        </Menu>

                    </Box>

                    {/* Versión Mobile  */}

                    <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Gym
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <a key={page} href={(page !== 'Upaje') ? `/${page.toLowerCase()}` : `https://upaje.com/`} style={{ textDecoration: 'none', color: 'inherit', marginRight: '16px' }}>
                                <Typography textAlign="center" onClick={() => router.push(`/${page.toLowerCase()}`)}>
                                    {page}
                                </Typography>
                            </a>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon sx={{ color: 'white', fontSize: 50 }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;


// src\components\users\UserContext.tsx

import { UserAction, UsersListResponse } from '@/types/user';
import { Dispatch, createContext } from 'react';

type UserContextProps = {
    users: UsersListResponse;
    dispatch: Dispatch<UserAction>;
}

export const UserContext = createContext({} as UserContextProps);

// src\components\users\UserList.tsx

import { useContext } from 'react';
import { UserContext } from './UserContext';
import { User, UserAction } from '@/types/user';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

const UserList: React.FC<{ users: User[] }> = ({ users: userList }) => {

    const { dispatch } = useContext(UserContext)!;
    

    // const handleAddUser = () => {
    //     const action: UserAction = {
    //         type: 'ADD_USER',
    //         payload: createUser()
    //     }
    //     dispatch(action);
    // }

    const handleRemoveUser = (userId: string) => {

        const action: UserAction = {
            type: 'REMOVE_USER',
            payload: { id: userId }
        }
        dispatch(action);
    }

    // const handleUpdateUser = (userId: string) => {
    //     console.log(`actualizar usuario nº :  ${userId}`);
    // }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        userList.map(({ _id, name, email }) => (
                            <TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{_id}</TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(_id)}></Button>
                                        {/* <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(_id)}></Button>
                                        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => handleAddUser()}></Button> */}
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList;

// src\components\users\UserProvider.tsx

import { FC, ReactNode, useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import { UsersListResponse, UserAction } from '../../types';

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider:FC<UserProviderProps> = ({ children }) => {

    const [users, dispatch] = useReducer( UsersListResponse , UserAction );

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            {children}
        </UserContext.Provider>
    )
};

// src\components\users\UserReducer.ts

import { UsersListResponse, UserAction } from "@/types/user";

export const userReducer = (state: UsersListResponse, action: UserAction): UsersListResponse => {
   switch (action.type) {
      case 'ADD_USER':
         return { users: [...state.users, action.payload] };
      case 'REMOVE_USER':
         return { users: state.users.filter(user => user._id !== action.payload.id) };
      // Puedes agregar más casos según tus necesidades
      default:
         return state;
   }
};


/*********   pages   *****/

// src\pages\_app.tsx

import type { AppProps } from 'next/app'
import { UserProvider } from '@/components/users/UserProvider'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { themeDark, themeLight } from '../themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

// src\pages\_document.tsx

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// src\pages\exercises.tsx

import { Layout } from '@/components/layouts';

const ExercisesPage = () => {
    return (
        <Layout title="Exercises - Gym">
            <div>Exercises Page</div>
            {/* Agrega aquí el contenido de la página Users */}
        </Layout>
    );
};

export default ExercisesPage;


// src\pages\exerciseslog.tsx

import { Layout } from '@/components/layouts';

const ExercisesLogPage = () => {
    return (
        <Layout title="Exercises Log - Gym">
            <div>Exercises Log Page</div>
            {/* Agrega aquí el contenido de la página Users */}
        </Layout>
    );
};

export default ExercisesLogPage;


// src\pages\index.tsx

import { Layout } from '@/components/layouts'

export default function IndexPage() {
  return (
    <Layout title='Home - Gym'>
      <div>Home Page</div>
    </Layout>
  )
}


// src\pages\users.tsx

import { getUsers } from '../api'
import { Layout } from '@/components/layouts';
import UserList from '@/components/users/UserList';
import { UsersListResponse } from '@/types/user';

const UsersPage: NextPage<UsersListResponse> = ({ users }) => {

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
    const users = await getUsers();
    
    return {
        props: {
            users
        }
    }
}

export default UsersPage;


/*****  themes  ********/
// src\themes\theme-dark.ts

import { createTheme } from '@mui/material/styles';

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});


// src\themes\theme-light.ts

import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});



/***  types   *******/

// src\types\user.ts

export type UsersListResponse = {
    users: User[];
}

export type User = {
    _id:   string;
    name:  string;
    email: string;
}

export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: {id: string} }
    | { type: 'SET_USERS'; payload: User[] }


