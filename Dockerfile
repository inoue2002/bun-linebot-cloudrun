FROM oven/bun

COPY . .
COPY package.json .
COPY bun.lockb .

RUN bun install

ENTRYPOINT ["bun", "./index.ts"]