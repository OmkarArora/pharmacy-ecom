// types.ts
import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  ShopPage: { healthCondition: string };
  ProductDetail: { productId: string };
};