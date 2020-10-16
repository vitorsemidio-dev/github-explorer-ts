import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { HeaderNavigation, Title, Form, UserList, Error } from './styles';

interface User {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newUser, setNewUser] = useState('');

  const [users, setUsers] = useState<User[]>(() => {
    const storagedUsers = localStorage.getItem('@GithubExplorer:users');

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:users', JSON.stringify(users));
  }, [users]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!newUser) {
      setInputError('Digite o nome do usuário');
      return;
    }

    try {
      const response = await api.get<User>(`users/${newUser}`);

      const repository = response.data;

      setUsers([...users, repository]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse usuário');
    }
  }

  return (
    <>
      <HeaderNavigation>
        <img src={logoImg} alt="Logo" />
        <Link to="/">Explorar repositórios</Link>
      </HeaderNavigation>
      <Title>Explore usuários no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          type="text"
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <UserList>
        {users.map((user) => (
          <Link
            key={user.login}
            to={`repositories/${user.html_url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name || user.login}</strong>
              <p>{user.bio}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </UserList>
    </>
  );
};

export default Dashboard;
