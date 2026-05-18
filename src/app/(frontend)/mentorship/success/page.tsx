import Stripe from "stripe"
import { redirect } from "next/navigation"
import { getPayload } from "payload"
import config from "@payload-config"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BookingSuccessClient } from "@/components/frontend/shop/BookingSuccessClient"
import type { Product } from "@/payload-types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const sessionId = resolvedSearchParams.session_id as string | undefined

  if (!sessionId) redirect("/shop")

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid") {
      redirect("/shop")
    }
  } catch (error) {
    console.error("Stripe session retrieval failed:", error)
    redirect("/shop")
  }

  // Parse all product IDs from the cart
  const productIdsParam = session.metadata?.productIds
  const legacyProductId = session.metadata?.productId
  let productIds: any[] = []
  
  if (productIdsParam) {
    try {
      productIds = JSON.parse(productIdsParam)
    } catch (e) {
      console.error("Failed to parse productIds from metadata", e)
    }
  } else if (legacyProductId) {
    productIds = [legacyProductId]
  }

  const payload = await getPayload({ config })
  let products: Product[] = []

  try {
    if (productIds.length > 0) {
      console.log(`🔍 Fetching ${productIds.length} products for checkout...`)
      
      const productsResult = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds.map(id => !isNaN(Number(id)) ? Number(id) : id)
          }
        },
        limit: 100
      })
      
      products = productsResult.docs as Product[]
    }
  } catch (error) {
    console.error("❌ Error fetching products in SuccessPage:", error)
  }

  // If there's exactly ONE product and it's a session, show the luxury UI
  if (products.length === 1 && products[0].type === "session") {
    return <BookingSuccessClient product={products[0]} sessionId={sessionId} />
  }

  // Multi-item or Standard Cart Flow
  const totalAmount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
  const currency = session.currency?.toUpperCase() || 'GBP'
  const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '₦'

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center pt-20 pb-24">
      <div className="container max-w-2xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-navy uppercase tracking-widest mb-4">
            Order Confirmed
          </h1>
          <p className="font-body text-navy/70 text-lg leading-relaxed">
            Thank you for your purchase. We&apos;ve sent the receipts and next steps to your email.
          </p>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white rounded-2xl border border-border/40 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10">
          <h2 className="font-heading text-xl text-navy uppercase tracking-widest mb-6 border-b border-border/40 pb-4">
            Order Summary
          </h2>
          
          <div className="space-y-4 mb-6">
            {products.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-heading text-lg text-navy">{p.title}</p>
                  <p className="text-xs font-bold text-gold uppercase tracking-widest mt-1">
                    {p.type === 'session' ? 'Mentorship Session' : p.type === 'digital' ? 'Digital Resource' : 'Physical Book'}
                  </p>
                </div>
                {p.price && (
                  <p className="font-heading text-lg text-navy">{currencySymbol}{p.price.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-border/40 pt-4">
            <p className="font-bold text-navy uppercase tracking-widest">Total Paid</p>
            <p className="font-heading text-2xl text-navy">{currencySymbol}{totalAmount}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="bg-navy text-white inline-flex items-center gap-3 py-3 px-8 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300"
          >
            Return to Shop
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-12">
            Ref: <span className="font-mono font-normal ml-1">{sessionId}</span>
          </p>
        </div>
      </div>
    </div>
  )
}