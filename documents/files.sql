Tengo los siguientes archivos

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
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Box sx={{ padding: '10px 20px' }}>
                {children}
            </Box>
        </Box>
    )
}

// src\components\types\User.ts

export interface User {
    id: string;
    name: string;
    email: string;
}

export const userData: User[] = [
    {
        id: '1',
        name: 'user 1',
        email: 'email-1-@email.com'
    },
    {
        id: '2',
        name: 'user 2',
        email: 'email-2-@email.com'
    },
    {
        id: '3',
        name: 'user 3',
        email: 'email-3-@email.com'
    }
]

export const createUser = (): User => {
    const num = random();
    return {
        id: `${num}`,
        name: `Producto ${num}`,
        email: `email-${num}-@email.com`
    }
}

export function random() {
    const min = 4;
    const max = 1000;
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// src\components\types\UserActions.ts

import { User } from './User';

export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: {id: string} }

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

import { Dispatch, createContext } from 'react';
import { User, UserAction } from '../types';

interface UserContextProps {
    users: User[];
    dispatch: Dispatch<UserAction>;
}


export const UserContext = createContext({} as UserContextProps );

// src\components\users\UserList.tsx

import { useContext } from 'react';
import { UserContext } from './UserContext';
import { UserAction, createUser } from '../types';

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

const UserList: React.FC = () => {

    const { users, dispatch } = useContext(UserContext)!;

    const handleAddUser = () => {
        const action: UserAction = {
            type: 'ADD_USER',
            payload: createUser()
        }
        dispatch(action);
    }

    const handleRemoveUser = (userId: string) => {
        const action: UserAction = {
            type: 'REMOVE_USER',
            payload: { id: userId }
        }
        dispatch(action);
    }

    const handleUpdateUser = (userId: string) => {
        console.log(`actualizar usuario nº :  ${userId}`);
    }

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
                        users.map(({ id, name, email }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(id)}></Button>
                                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(id)}></Button>
                                        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => handleAddUser()}></Button>
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
import { userData } from '../types';

interface UserProviderProps {
    children: ReactNode;
}


export const UserProvider:FC<UserProviderProps> = ({ children }) => {

    const [users, dispatch] = useReducer( userReducer , userData );

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            {children}
        </UserContext.Provider>
    )
};

// src\components\users\UserReducer.ts

import { User, UserAction } from '../types';

export const userReducer = (state: User[], action: UserAction): User[] => {
   switch (action.type) {
      case 'ADD_USER':
         return [...state, action.payload];
      case 'REMOVE_USER':
         return state.filter(user => user.id !== action.payload.id);
      // Puedes agregar más casos según tus necesidades
      default:
         return state;
   }
};


// pages/exercises.tsx

import { Layout } from '@/components/layouts';

const ExercisesPage = () => {
    return (
        <Layout title="Exercises - Gym">
            <div>ExercisesPage</div>
            {/* Agrega aquí el contenido de la página Users */}
        </Layout>
    );
};

export default ExercisesPage;

// pages/exerciseslog.tsx

import { Layout } from '@/components/layouts';

const ExercisesLogPage = () => {
    return (
        <Layout title="Exercises Log - Gym">
            <div>ExercisesLogPage</div>
            {/* Agrega aquí el contenido de la página Users */}
        </Layout>
    );
};

export default ExercisesLogPage;

// src\pages\home\index.tsx

import React from 'react'

const HomePage = () => {
  return (
      <div>Home Page</div>
  )
}

export default HomePage;


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


// src\pages\_app.tsx

import { UserProvider } from '@/components/users/UserProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
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


// src\pages\index.tsx

import { Inter } from 'next/font/google'
import { Layout } from '@/components/layouts'
import  HomePage  from './home/index';

const inter = Inter({ subsets: ['latin'] })

export default function IndexPage() {
  return (
    <Layout title='Home - Gym'>
      <HomePage/>
    </Layout>
  )
}

// src\pages\api\gymApi.ts

import axios from 'axios';

const gymApi = axios.create({
    baseURL: 'https://gym-backend.upaje.com',
});

export default gymApi;


// src\interfaces\users-list.ts

export interface UsersListResponse {
    users: User[];
}

export interface User {
    _id:   string;
    name:  string;
    email: string;
}






