# Dockerfile
FROM node:20-bullseye

WORKDIR /app

# 依存関係定義だけコピー（重要）
COPY package.json package-lock.json ./

# lockfile完全再現
RUN npm ci

# Firebase CLIをグローバルにインストール
# あとで追加したためあっっているかはわからない
RUN npm install -g firebase-tools

# ソースコードコピー
COPY . .

# Vue CLI dev server
EXPOSE 8080

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]

