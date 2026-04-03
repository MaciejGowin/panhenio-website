PROJECT=PANHENIO
PROJECT_LOWER=panhenio
ENVIRONMENT=PROD
ENVIRONMENT_LOWER=prod
BUCKET=panhenio-cicd-prod

## Start development server (Vite HMR)
#run:
#	npm run dev
#
## Production build -> dist/
#build:
#	npm run build
#
## Serve the production build locally
#start:
#	npm run start
#
## Deploy to S3 bucket
#deploy: build
#	aws s3 sync ./dist/ s3://panhenio-website-prod --delete

build:
	npm ci
	npm run build:open-next

build-sam:
	sam build -b deployments/

build-WebsiteFunction:
	cp -r .open-next/server-functions/default/* $(ARTIFACTS_DIR)/
	cp -r .open-next/server-functions/default/.next $(ARTIFACTS_DIR)/

deploy-sam:
	sam deploy \
		--template-file deployments/template.yaml \
		--stack-name "${PROJECT}-WEBSITE-LAMBDAS-${ENVIRONMENT}" \
		--s3-bucket ${BUCKET} \
		--s3-prefix website-lambdas \
		--parameter-overrides Project=${PROJECT} Environment=${ENVIRONMENT} \
		--capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND

deploy-web:
	aws s3 sync .open-next/assets s3://panhenio-website-prod --delete

deploy: build build-sam deploy-sam deploy-web