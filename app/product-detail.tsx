import { Redirect } from 'expo-router';

export default function ProductDetailRoute() {
  // Redirect to home - product details are handled within HomeScreen/ProductsScreen
  return <Redirect href="/(tabs)" />;
}