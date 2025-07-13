import { mockProducts } from '@/mock/mockProducts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ProductDescription from '../../../components /Product/ProductDescriprion';

export const unstable_settings = {
  initialRouteName: 'index',
};

export const options = {
  tabBarStyle: { display: 'none' },
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  const product = mockProducts.find((p) => p.id === id); 

  if (!product) return null;

  return (
    <ProductDescription
      product={{
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: 5.0,
        reviewsCount: 123,
        description: product.description,
      }}
      onBackPress={() => router.back()}
    />
  );
}
