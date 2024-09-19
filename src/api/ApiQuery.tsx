import { gql } from '@apollo/client';

export const LIST_CUSTOMERS = gql`
    query ListZellerCustomers($limit: Int, $nextToken: String) {
        listZellerCustomers(limit: $limit, nextToken: $nextToken) {
            items {
                id
                name
                email
                role
            }
        nextToken
        }
    }`;