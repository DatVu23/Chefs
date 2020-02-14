import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import styled from 'styled-components'

interface Chef {
  id: string;
  name: string;
  restaurants: Restraurant[];
}

interface QueryData {
  chefs: Chef[];
}

interface Restraurant {
  id: string;
  name: string;
}

const Chef = styled.div`
  margin-bottom: 1rem;
`;

const ChefName = styled.strong`
  font-size: 1.5rem;
`;

const Restaurant = styled.span`
  background-color: #eeeeee;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25rem;
  margin: 0.25em 0.5rem 0.25rem 0;
`;

const Restaurants = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: .5rem;
`;

const Wrapper = styled.div``;

const query = gql`
  {
    chefs {
      id
      name
      restaurants {
        id
        name
      }
    }
  }
`;

const Chefs = () => {
  const { data, loading } = useQuery<QueryData>(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Wrapper>{data && data.chefs.map(chef => (
      <Chef key={chef.id}>
        <ChefName>{chef.name}</ChefName>
        <Restaurants>
          {chef.restaurants.map(restaurant =>
            <Restaurant key={restaurant.id}>{restaurant.name}</Restaurant>)}
        </Restaurants>
      </Chef>
    ))}</Wrapper>
  )
}

export default Chefs;