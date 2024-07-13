import { NextResponse } from "next/server";
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
    url: "https://develop.sonduckfilm.com/wp-json",
    consumerKey: "ck_a3024c39d99841d8178850ebe3932c74f58c3b3e",
    consumerSecret: "cs_6ac0f165f893fe7bf5b2fd9de93eb1d2a405e002",
    version: 'wc/v3',
  });
  
  export async function GET(req) {
    try {
      const response = await api.get('products');
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json(
        {
          code: error.response.status,
          message: error.response.data.message,
        },
        { status: error.response.status }
      );
    }
  }