import { db } from './../utils/firebase'

const productsRef = db.collection('products')

const getProducts = async () => {
  let result: any[] = []
  const snapshot = await productsRef.get()

  snapshot.forEach((doc) => {
    result.push({ ...doc.data() })
  })
  return result
}

const getProductsByType = async (type: string) => {
  let result: any[] = []
  const snapshot = await productsRef.where('type', '==', type).get()

  snapshot.forEach((doc) => {
    result.push({ ...doc.data() })
  })
  return result
}

const getProductsByCategory = async (category: string) => {
  let result: any[] = []
  const snapshot = await productsRef.where('categories', 'array-contains', category).get()

  snapshot.forEach((doc) => {
    result.push({ ...doc.data() })
  })
  return result
}

const getProductById = async (id: string) => {
  let result: any[] = []
  const snapshot = await productsRef.where('id', '==', id).get()

  snapshot.forEach((doc) => {
    result.push({ ...doc.data() })
  })
  return result[0]
}

const getProductByUrlName = async (urlName: string) => {
  let result: any[] = []
  const snapshot = await productsRef.where('urlName', '==', urlName).get()

  snapshot.forEach((doc) => {
    result.push({ ...doc.data() })
  })
  return result[0]
}

const saveProducts = async (products: any[]) => {
  for (const product of products) {
    await productsRef.doc(product.id).set({
      ...product,
    })
  }
}

const saveProduct = async (product: any) => {
  await productsRef.doc(product.id).set({
    ...product,
  })
}

const deleteProduct = async (id: string) => {
  await productsRef.doc(id).delete()
}

export const ProductsService = {
  saveProducts,
  getProducts,
  getProductsByType,
  getProductsByCategory,
  saveProduct,
  getProductById,
  getProductByUrlName,
  deleteProduct,
}
