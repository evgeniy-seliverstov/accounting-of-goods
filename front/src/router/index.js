import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shelf from '../views/Shelf/Shelf.vue'
import ShelfAdd from '../views/Shelf/ShelfAdd.vue'
import ShelfEdit from '../views/Shelf/ShelfEdit.vue'
import Supplier from '../views/Supplier/Supplier.vue'
import SupplierAdd from '../views/Supplier/SupplierAdd.vue'
import SupplierEdit from '../views/Supplier/SupplierEdit.vue'
import Type from '../views/Type/Type.vue'
import TypeAdd from '../views/Type/TypeAdd.vue'
import TypeEdit from '../views/Type/TypeEdit.vue'
import Good from '../views/Good/Good.vue'
import GoodAdd from '../views/Good/GoodAdd.vue'
import GoodEdit from '../views/Good/GoodEdit.vue'
import Order from '../views/Order/Order.vue'
import OrderAdd from '../views/Order/OrderAdd.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shelf',
    name: 'Shelf',
    component: Shelf
  },
  {
    path: '/shelf/add',
    name: 'ShelfAdd',
    component: ShelfAdd
  },
  {
    path: '/shelf/:id/edit',
    name: 'ShelfEdit',
    component: ShelfEdit
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Supplier
  },
  {
    path: '/supplier/add',
    name: 'SupplierAdd',
    component: SupplierAdd
  },
  {
    path: '/supplier/:id/edit',
    name: 'SupplierEdit',
    component: SupplierEdit
  },
  {
    path: '/type',
    name: 'Type',
    component: Type
  },
  {
    path: '/type/add',
    name: 'TypeAdd',
    component: TypeAdd
  },
  {
    path: '/type/:id/edit',
    name: 'TypeEdit',
    component: TypeEdit
  },
  {
    path: '/good',
    name: 'Good',
    component: Good
  },
  {
    path: '/good/add',
    name: 'GoodAdd',
    component: GoodAdd
  },
  {
    path: '/good/:id/edit',
    name: 'GoodEdit',
    component: GoodEdit
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/order/add',
    name: 'OrderAdd',
    component: OrderAdd
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
