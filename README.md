# Gatsbylius

Gatsby + Sylius = :rocket:

Le site le plus rapide du monde

Started with :heart: :beers: :fire: in Béthune #opengento 

## Docs

- https://docs.sylius.com/en/latest/index.html
- https://app.swaggerhub.com/apis/Sylius/sylius-shop-api/1.0.0#/Product
- https://www.gatsbyjs.org/docs/

## Install

### With docker (recommended)

#### Prerequisites

- docker 1.13.0+
- docker-compose
- traefik

#### Steps

- create `.env.development` and add you sylius shop URL like `GATSBY_SYLIUS_URL=http://my-sylius-shop.com`
- run cmd `docker-compose up -d`
- open `https://gatsbylius.test/` in your browser

### Without docker

#### Prerequisites

- Node 10+ (12 recommended)
- run cmd `npm install && npm run develop`
- open `http://localhost:8000/` in your browser
