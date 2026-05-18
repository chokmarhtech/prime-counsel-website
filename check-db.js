const payload = require('payload');
require('dotenv').config();

async function checkDatabase() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  });

  const orders = await payload.find({
    collection: 'orders',
    depth: 2,
    limit: 10,
    sort: '-createdAt'
  });

  console.log("Recent Orders:");
  orders.docs.forEach(o => {
    console.log(`Order ID: ${o.id}, Token: ${o.downloadToken}, Product: ${o.product?.title}`);
    if (o.product?.digitalFile) {
        console.log(`  -> Digital File:`, o.product.digitalFile);
    } else {
        console.log(`  -> No digital file attached`);
    }
  });

  process.exit(0);
}

checkDatabase();
