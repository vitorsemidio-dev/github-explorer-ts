import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [repositoryResponse, issuesResponse] = await Promise.all([
        api.get<Repository>(`repos/${params.repository}`),
        api.get<Issue[]>(`repos/${params.repository}/issues`),
      ]);

      setRepository(repositoryResponse.data);
      setIssues(issuesResponse.data);
      console.log(repositoryResponse.data);
      console.log(issuesResponse.data);
    }

    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src={repository?.owner.avatar_url} alt="Avatar" />
          <div>
            <strong>Repositorio/nome</strong>
            <p>Descrição do repositório</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>1000</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>100</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>30</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="repositories/{repository.full_name">
          <div>
            <strong>repository.full_name</strong>
            <p>repository.description</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
