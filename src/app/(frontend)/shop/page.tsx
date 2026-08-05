import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Layout from '@/components/frontend/layout/Layout'
import { ShopGrid, ShopHero } from '@/components/frontend/pages/shop'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const payload = await getPayload({ config: configPromise })

  try {
    const { docs: products } = await payload.find({
      collection: 'products',
      depth: 1,
      limit: 100,
    })

    const { docs: categories } = await payload.find({
      collection: 'categories',
      limit: 100,
    })

    return (
      <Layout>
        <ShopHero />
        <ShopGrid initialProducts={products} initialCategories={categories} />
      </Layout>
    )
  } catch (error: any) {
    console.error("ShopPage Error:", error)
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Server Error</h1>
          <p className="text-gray-600 mb-4">An error occurred while loading the shop.</p>
          <pre className="text-left bg-gray-100 p-4 max-w-2xl mx-auto overflow-auto text-sm">
            {error.message || String(error)}
          </pre>
        </div>
      </Layout>
    )
  }
}
