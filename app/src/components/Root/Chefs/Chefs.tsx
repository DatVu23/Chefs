import * as React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

import AddRestaurant from "./AddRestaurant";
import AddChef from "./AddChef";

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
  margin-top: 0.5rem;
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

const createChefMutation = gql`
  mutation($name: String!) {
    createChef(name: $name) {
      id
      name
    }
  }
`;

const createRestaurantMutation = gql`
  mutation($chefId: ID!, $name: String!) {
    createRestaurant(chefId: $chefId, name: $name) {
      id
      name
    }
  }
`;

const Chefs = () => {
  const { data, loading, refetch } = useQuery<QueryData>(query);
  const [createChef] = useMutation<
    {
      createChef: Chef;
    },
    {
      name: string;
    }
  >(createChefMutation);
  const [createRestaurant] = useMutation<
    {
      createRestaurant: Restraurant;
    },
    {
      chefId: string;
      name: string;
    }
  >(createRestaurantMutation);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Wrapper>
      {data &&
        data.chefs.map(chef => (
          <Chef key={chef.id}>
            <ChefName>{chef.name}</ChefName>
            <Restaurants>
              {chef.restaurants.map(restaurant => (
                <Restaurant key={restaurant.id}>{restaurant.name}</Restaurant>
              ))}
              <AddRestaurant
                onAddRestaurant={async ({ name }) => {
                  await createRestaurant({
                    variables: { chefId: chef.id, name }
                  });
                  refetch();
                }}
              />
            </Restaurants>
          </Chef>
        ))}
      <AddChef
        onAddChef={async ({ name }) => {
          await createChef({ variables: { name } });
          refetch();
        }}
      />
    </Wrapper>
  );
};

export default Chefs;
