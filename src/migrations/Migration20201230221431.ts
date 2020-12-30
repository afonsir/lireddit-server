import { Migration } from '@mikro-orm/migrations';

export default class Migration20201230221431 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "post" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }
}
