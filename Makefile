# Start development server (Vite HMR)
start-server:
	npm run dev

# Production build -> dist/
build:
	npm run build

# Serve the production build locally
preview:
	npm run preview   

# Deploy to S3 bucket
deploy:
	aws s3 rm s3://panhenio-website-prod --recursive
	aws s3 cp ./dist s3:://panhenio-website-prod --recursive
