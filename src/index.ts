import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config';

import Post from './entities/Post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
};

main().catch(err => {
  console.error(err);
});
