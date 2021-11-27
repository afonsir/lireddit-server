import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql'
import argon2 from 'argon2'

import { MyContext } from '../types'
import User from '../entities/User'

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string

  @Field()
  password: string
}

@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('input') input: UsernamePasswordInput,
    @Ctx() { em }: MyContext,
  ) {
    const hashedPassword = await argon2.hash(input.password)
    const user = em.create(User, {
      username: input.username,
      password: hashedPassword
    })
    await em.persistAndFlush(user)
    return user
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') input: UsernamePasswordInput,
    @Ctx() { em }: MyContext,
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: input.username })

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "that username doesn't exist"
          }
        ]
      }
    }

    const valid = await argon2.verify(user.password, input.password)

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password'
          }
        ]
      }
    }

    return { user }
  }
}
