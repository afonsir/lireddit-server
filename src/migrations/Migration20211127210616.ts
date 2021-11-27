import { Migration } from '@mikro-orm/migrations';

export default class Migration20211127210616 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
  }
}
