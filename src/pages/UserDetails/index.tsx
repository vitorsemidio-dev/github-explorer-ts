import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Header, UserInfo, UserRepositoryList } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  user: string;
}

interface Repository {
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
}

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

const Repository: React.FC = () => {
  const { goBack } = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [userRepositories, setUserRepositories] = useState<Repository[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [userResponse, userRepositoriesResponse] = await Promise.all([
        api.get<User>(`users/${params.user}`),
        api.get<Repository[]>(`users/${params.user}/repos`),
      ]);

      setUser(userResponse.data);
      setUserRepositories(userRepositoriesResponse.data);
    }

    loadData();
  }, [params.user]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="" onClick={goBack}>
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {user && (
        <UserInfo>
          <header>
            <img src={user.avatar_url} alt={user.name || user.login} />
            <div>
              <strong>{user.name || user.login}</strong>
              <p>{user.bio}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{user.public_repos}</strong>
              <span>Public Repos</span>
            </li>
            <li>
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </li>
            <li>
              <strong>{user.following}</strong>
              <span>Following</span>
            </li>
          </ul>
        </UserInfo>
      )}

      <UserRepositoryList>
        {userRepositories.map((repository) => (
          <a
            key={repository.name}
            rel="noopener noreferrer"
            target="_blank"
            href={repository.html_url}
          >
            <div>
              <strong>{repository.name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </UserRepositoryList>
    </>
  );
};

export default Repository;
