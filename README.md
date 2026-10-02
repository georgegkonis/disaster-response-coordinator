# Disaster Response Coordinator

A full stack application for coordinating requests, offers, and resources during a disaster. The Angular client provides maps, dashboards, announcements, and inventory views. A TypeScript/Express API handles authentication and the underlying request, offer, user, and warehouse data.

## Stack

- Frontend: Angular, NgRx, PrimeNG, and Leaflet
- API: Node.js, Express, TypeScript, and JWT authentication
- Data services: MongoDB and Redis

## Run locally

You need Node.js, npm, Docker Compose, and OpenSSL.

1. Copy `.env.example` to `.env` in the repository root. Set a local MongoDB password and provide a base64-encoded RSA private/public key pair for JWT signing. Keep `.env` private; it is ignored by Git.
2. Start MongoDB and Redis from the repository root:

   ```bash
   docker compose up -d
   ```

3. Start the API in a separate terminal:

   ```bash
   cd backend
   npm ci
   npm start
   ```

4. Start the client in another terminal:

   ```bash
   cd frontend
   npm ci
   npm start
   ```

The client runs at `http://localhost:4200`. Its API URL is configured in `frontend/src/assets/settings.json` and defaults to the API on port `8000`.

For local RSA keys, generate a pair outside the repository and base64-encode each PEM file before adding the values to `.env`:

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out /tmp/drc-private.pem
openssl rsa -in /tmp/drc-private.pem -pubout -out /tmp/drc-public.pem
base64 -w 0 /tmp/drc-private.pem
base64 -w 0 /tmp/drc-public.pem
```

Remove the temporary PEM files after setting up `.env`.

## Project layout

- `frontend/`: Angular client and application views
- `backend/`: Express API, routes, services, and data models
- `docker-compose.yml`: local MongoDB and Redis services

## License

See [LICENCE](LICENCE).
