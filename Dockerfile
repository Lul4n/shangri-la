FROM node:20.8.0-alpine AS BACKEND_BUILDER
WORKDIR /shangri-la/
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
RUN npm run build

FROM node:20.8.0-alpine AS FRONTEND_BUILDER
WORKDIR /shangri-la/
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM node:20.8.0-alpine
ENV NODE_ENV=production

WORKDIR /shangri-la/backend
COPY backend/package*.json ./
RUN npm ci

ENV SHANGRILA_PATH /shangri-la
ENV FRONTEND_PATH $SHANGRILA_PATH/frontend
ENV BACKEND_PATH $SHANGRILA_PATH/backend
WORKDIR $SHANGRILA_PATH

COPY --from=BACKEND_BUILDER /shangri-la/dist $BACKEND_PATH
COPY --from=FRONTEND_BUILDER /shangri-la/build $FRONTEND_PATH

ENV PORT 80
ENV FRONTEND_PREFIX /frontend
ENV BACKEND_PREFIX /backend

WORKDIR $BACKEND_PATH
CMD ["node", "index.js"]