---
layout: post
title: '基于dumi、father、lerna、搭建monorepo组件库'
date: 2022-11-14 13:21:00 +0800
categories: jekyll update
---

# 基于dumi、father、lerna、搭建monorepo组件库

## dumi

dumi，中文发音嘟米，是一款为组件开发场景而生的静态站点框架，与 father 一起为开发者提供一站式的组件开发体验，father 负责组件源码构建，而 dumi 负责组件开发及组件文档生成。

## father

father 是一款 NPM 包研发工具，能够帮助开发者更高效、高质量地研发 NPM 包、生成构建产物、再完成发布。它主要具备以下特性：

## lerna

Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目。针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化。

## monorepo

monolithic repository // 单体仓库

## 开发

### 安装依赖

```sh
yarn install 
```

> tip: 本项目用yarn来管理依赖，因为要用到yarn workspaces功能
>
> + 减少依赖重复安装
> + 优雅地实现跨目录代码共享
> + 对依赖版本进行统一管理以避免版本冲突
>
> npm7.x开始支持workspace
  
### 启动father

```sh
yarn fd
``` 

### 启动dumi

```sh
yarn dev
```

### 依赖添加方式

```sh
yarn workspace @supdiscr/components add @supdiscr/button
```

### 本地引用依赖方式

```tsx
// 和引入node_modules依赖一样的方式
import { DiscrButton } from '@supdiscr/components';
```

### 发布npm包

本地开发完后，构建产物并发布到verdaccio，还会自动push到remote

```sh
yarn fb
lerna publish
```



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