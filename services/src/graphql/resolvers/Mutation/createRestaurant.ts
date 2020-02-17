import { Restaurant } from "#root/db/models";

const createRestaurant = (context: any, { chefId, name }: { chefId: number; name: string }) => 
  Restaurant.create({ chefId, name })

export default createRestaurant; 