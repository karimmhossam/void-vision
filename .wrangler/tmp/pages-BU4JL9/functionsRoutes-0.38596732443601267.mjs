import { onRequestPost as __api_auth_login_js_onRequestPost } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\auth\\login.js"
import { onRequestPut as __api_orders__id__js_onRequestPut } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\orders\\[id].js"
import { onRequestDelete as __api_products__id__js_onRequestDelete } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\products\\[id].js"
import { onRequestPut as __api_products__id__js_onRequestPut } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\products\\[id].js"
import { onRequestGet as __api_orders_js_onRequestGet } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\orders.js"
import { onRequestPost as __api_orders_js_onRequestPost } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\orders.js"
import { onRequestGet as __api_products_js_onRequestGet } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\products.js"
import { onRequestPost as __api_products_js_onRequestPost } from "C:\\Users\\hooligan\\Projects\\vogue-vault\\functions\\api\\products.js"

export const routes = [
    {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/orders/:id",
      mountPath: "/api/orders",
      method: "PUT",
      middlewares: [],
      modules: [__api_orders__id__js_onRequestPut],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "DELETE",
      middlewares: [],
      modules: [__api_products__id__js_onRequestDelete],
    },
  {
      routePath: "/api/products/:id",
      mountPath: "/api/products",
      method: "PUT",
      middlewares: [],
      modules: [__api_products__id__js_onRequestPut],
    },
  {
      routePath: "/api/orders",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_orders_js_onRequestGet],
    },
  {
      routePath: "/api/orders",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_orders_js_onRequestPost],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_js_onRequestGet],
    },
  {
      routePath: "/api/products",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_products_js_onRequestPost],
    },
  ]