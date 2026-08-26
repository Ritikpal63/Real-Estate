# Real Estate application

## Service enquiry email setup

1. Create the server environment file and fill in the database and mail values:

   ```bash
   cp server/.env.example server/.env
   ```

   For Gmail, use an App Password in `SMTP_PASS`; a normal Gmail password will
   not work. `ADMIN_EMAIL` is the inbox that receives service enquiries.

2. Install dependencies and create/update the database tables:

   ```bash
   cd server
   npm install
   npm run migrate
   ```

3. Start the API (port 8000 by default):

   ```bash
   npm run dev
   ```

4. In another terminal, start the client:

   ```bash
   cd client
   npm install
   npm run dev
   ```

The client uses `VITE_API_URL` from `client/.env.development`. For local use it
should be `http://localhost:8000/api`.
