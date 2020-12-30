import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export default class Post {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'text' })
  title!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
