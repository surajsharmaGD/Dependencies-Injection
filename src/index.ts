import { Users } from './services/users';
import { Logger } from './services/logger';

import type { User, ApiConfig } from './types';
import { createIoCContainer } from './ioc';

let ioc: ReturnType<typeof createIoCContainer>;

const renderUsers = async (config: ApiConfig) => {
  const usersService: Users = ioc.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  renderUsers(ioc.resolve('apiConfig'));
};

window.onload = (event: Event) => {
  ioc = createIoCContainer();
  const logger: Logger = ioc.resolve('logger');
  logger.info('Page is loaded.');

  app();
};

export const getConfig = (): ApiConfig =>  {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;
  return config.api;
}
