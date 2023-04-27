---
layout: post
title: '杂'
date: 2022-11-14 13:21:00 +0800
categories: jekyll update
---

# 基于dumi、father、lerna、搭建monorepo组件库

## yarn Workspaces

工作空间是一个本地代码包，由同一项目的源代码组成

+ 减少依赖重复安装
+ 优雅地实现跨目录代码共享
+ 对依赖版本进行统一管理以避免版本冲突

> tips:
  npm7.x支持workspace

### yarn workspaces 和 lerna的区别

Yarn workspace只会在根目录安装一个node_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行yarn/npm install，并在每个package中创建一个node_modules。

### 使用方法

```sh
yarn workspace @supdiscr/components add @supdiscr/button
```

### 直接引用模块地址

```tsx
import { DiscrButton } from '@supdiscr/components';
```

### 在同个目录下开发发布

.fatherrc.ts

```ts
import { readdirSync } from 'fs';
import { join } from 'path';
const headPkgs: string[] = ['button', 'modal','components'];
const tailPkgs = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg),
);

const paks = [...headPkgs, ...tailPkgs];
const overrides = {};
paks.forEach((pkg) => {
  overrides[`packages/${pkg}/src`] = { output: `/packages/${pkg}/es` };
});

export default {
  esm: {
    input: 'packages',
    output: 'packages',
    overrides: overrides,
  },
};
```

father dev后使用father build，文件不改动的情况下，构建不会变化，因此构建产物会有问题
