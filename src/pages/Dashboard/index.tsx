import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState([]);
  const [newRepo, setNewRepo] = useState('');

  function handleAddRepository(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(newRepo);
  }

  return (
    <>
      <img src={logoImg} alt="Logo" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://api.adorable.io/avatars/70/abott@adorable.png"
            alt="Adorable Avatars"
          />
          <div>
            <strong>Repositório</strong>
            <p>Descrição do repositório</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
