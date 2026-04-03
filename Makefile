# Start development server (Vite HMR)
run:
	npm run dev

# Production build -> dist/
build:
	npm run build

# Serve the production build locally
start:
	npm run start

# Deploy to S3 bucket
deploy: build
	aws s3 sync ./dist/ s3://panhenio-website-prod --delete
