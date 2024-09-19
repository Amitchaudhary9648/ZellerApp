import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const ApiClient = new ApolloClient({
    link: new HttpLink({
        uri: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
        headers: {
            'x-api-key': 'da2-6y6arb7mwvgrnmds2jignrgr2u',
        },
    }),
    cache: new InMemoryCache(),
});