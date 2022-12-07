This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How To Setup and Run Web App
1. Make sure node and yarn already installed (minimum node v16 and yarn v1.22)
2. Clone this repo
3. Run `yarn install`
4. Run `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Start Development
For modifying app entry point, you can go to `src/pages/index.tsx`. Each functions are located inside `modules` directory. 

## Publishing & Deployment (via Vercel)
For publishing the app to expo, you just need to push or merge the PR. It will automatically build and pushed to Vercel
see: [workflows](.github/workflows/deploy.yml)

## Things to do & Future Improvement
1. Better CSS module implementation which may bring performance improvement
2. Move redundant styling to global style
3. Unit test especially for core functions
4. Dynamically dark or light mode on component level
5. Update animation handler with `react-native-reanimated`
6. Better API handler to manage error state and provide clear error message to user
7. Implement git hooks with `husky` and `commitlint` implementation to pre commit check and make sure commit message is following convention
8. Better eslint implementation to increase development experience

