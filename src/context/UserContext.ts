import { createContext } from 'react';

export type UserType = {
    avatar: string;
    name: string;
}

const UserContext = createContext<UserType | null>(null);

export default UserContext;