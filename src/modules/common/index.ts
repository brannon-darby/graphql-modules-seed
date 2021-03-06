import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFiles, loadSchemaFiles } from '@graphql-modules/sonar';
import { mergeGraphQLSchemas, mergeResolvers } from '@graphql-modules/epoxy';
import { ChatDbObject, MessageDbObject } from "@models";
import { DIRECTIVES } from 'graphql-codegen-typescript-mongodb';

export const CHATS = Symbol.for('CHATS');
export const MESSAGES = Symbol.for('MESSAGES');

export interface CommonModuleConfig {
  chats: ChatDbObject[];
  messages: MessageDbObject[];
}

export const CommonModule = new GraphQLModule<CommonModuleConfig>({
  providers: ({ config: {chats, messages} }) => [
    { provide: CHATS, useValue: chats },
    { provide: MESSAGES, useValue: messages },
  ],
  typeDefs: [
    ...loadSchemaFiles(__dirname + '/schema/'),
    DIRECTIVES,
  ],
  resolvers: mergeResolvers(loadResolversFiles(__dirname + '/resolvers/')),
  configRequired: true
});
