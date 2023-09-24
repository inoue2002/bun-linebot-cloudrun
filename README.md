# bun-linebot

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

- Run on Google Cloudでうまく作成できない方へ
  - 一度CloudRunとビルドイメージを削除することで1からやり直すことができます。以下2箇所から該当するものを削除してください。
  - https://console.cloud.google.com/run
  - https://console.cloud.google.com/gcr/images/

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

```
bun create github.com/<user>/<repo>
```

```
 gcloud builds submit --project "bun-cloudrun" --config=./cloud-build.yml

 gcloud beta run deploy demo \
  --region us-central1 --allow-unauthenticated --project \
  "bun-cloudrun" --image gcr.io/bun-cloudrun/bun-example

```

参考にした記事
- https://qiita.com/ryo2132/items/8b957ed8b649f941fc3f