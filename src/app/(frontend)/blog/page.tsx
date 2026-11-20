import Layout from '@/components/frontend/layout/Layout'
import { BlogHero, FeaturedPost, PostGrid } from '@/components/frontend/pages/blog'

export const revalidate = 600

export default function BlogPage() {
  return (
    <Layout>
      <BlogHero />
      <FeaturedPost />
      <PostGrid />
    </Layout>
  )
}
