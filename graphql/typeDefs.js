const { gql } = require('apollo-server');

module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

type user {
        username: String
        email: String
        password: String
        token: String
}

input MessageInput {
    text: String
    username: String
}

input RegiserInput {
    username: String
    email: String
    password: String
}

input LoginInput {
        email: String
        password: String
}

type Query {
    message(id: ID!): Message
    user(id: ID!): User
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    regisrerUser(RegiserInput: RegiserInput): user
    loginUser(LoginInput: LoginInput): User
}
`