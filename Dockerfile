# run this file with the command: docker build -t my-node-app .
# run this file with the command: docker run -p 5173:5173 my-node-app
FROM node:20-alpine

# Cài toolchain để build được binary (cần thiết với Alpine)
RUN apk add --no-cache python3 make g++

WORKDIR /PORTFOLIO

# Copy trước để tận dụng cache layer
COPY package*.json ./

# Bắt buộc cài đúng version esbuild trước (cho khớp với vite nếu cần)
RUN npm install esbuild@0.24.2 --platform=linuxmusl --save-dev

# Sau đó cài tiếp các gói còn lại
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--port=5713", "--host=0.0.0.0"]
