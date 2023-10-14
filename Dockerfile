FROM node:20.8.0-alpine AS BACKEND_BUILDER
RUN apk update && apk add openjdk17
WORKDIR /shangri-la/backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm ci
COPY tsconfig.json ../tsconfig.json
COPY backend ./
COPY api ../api
RUN npm run build

FROM node:20.8.0-alpine AS FRONTEND_BUILDER
RUN apk update && apk add openjdk17
WORKDIR /shangri-la/frontend
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm ci
COPY tsconfig.json ../tsconfig.json
COPY frontend ./
COPY api ../api
RUN npm run build

FROM node:20.8.0-alpine
ENV NODE_ENV=production

WORKDIR /shangri-la/backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm ci

ENV SHANGRILA_PATH /shangri-la
ENV FRONTEND_PATH $SHANGRILA_PATH/frontend
ENV BACKEND_PATH $SHANGRILA_PATH/backend
WORKDIR $SHANGRILA_PATH

COPY --from=BACKEND_BUILDER /shangri-la/backend/dist $BACKEND_PATH
COPY --from=FRONTEND_BUILDER /shangri-la/frontend/dist $FRONTEND_PATH

ENV PORT 80
ENV FRONTEND_PREFIX /frontend ## needs also to be adjusted in the frontend package.json
ENV BACKEND_PREFIX /backend

WORKDIR $BACKEND_PATH
CMD ["node", "src/index.js"]