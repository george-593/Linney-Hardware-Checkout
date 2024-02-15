Full-Stack Hardware Checkout system using express, node.js and postgresql for the backend. React and TailwindCSS for the frontend.

Originally started as part of work experience with linney but I have continued it after the work experience has concluded

# DB Commands

`docker build -t hardware-checkout-postgres-db .`
`docker images -a`
`docker run -d -p 5432:5432 --name hardware-checkout-db-container hardware-checkout-postgres-db`

# API & Frontend Commands

`npm run dev`
