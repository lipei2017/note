---
title: '应用研发二部git操作规范'
date: '2021-04-27'
---

### 领域

- metadata: 主数据
- wms: 仓储
- mes: 生产
- eam: 设备
- qms: 质量

### 分支命名规范

- feature/[领域](#领域)/功能/20220525
- feature/功能/20220525
- release/[领域](#领域)/20220525
- release/20220525
- hotfix/[领域](#领域)/20220525
- hotfix/20220525

> Tip: <br>
>
> - 如果是一个整包，可以忽略[领域];<br>
> - 如果是订制包，发布到对应的项目目录下比如：<font color=red><strong>jinji</strong></font>/release/领域/20220525
> - 建议用'/'分隔，有些 git 插件可以将这种形式的路径转换成文件目录形式，便于管理

### 开发流程

#### 接到新需求

1. 获取最新的稳定版本的主分支，如：main

```
git fetch origin main
```

2. 新建基于 main 的开发分支，如：feature/wms/stockTransfer/20220525，并且切换到该分支

```
git checkout -b feature/wms/stockTransfer/20220525 origin/main
```

#### 需求开发完毕

1. 获取最新的提测分支，如：release/wms/20200530（提测分支基于最新的稳定版本 main 迁出）

```
(feature/wms/stockTransfer/20220525)
git fetch orgin release/wms/20200530
```

2. 将当前开发分支基于提测分支做 rebase

```
(feature/wms/stockTransfer/20220525)
git rebase origin/release/wms/20200530
```

3. 迁出提测分支，并切换到该分支，将开发分支合并到提测分支

```
(feature/wms/stockTransfer/20220525)
git checkout -b release/wms/20200530 origin/release/wms/20200530
(release/wms/20200530)
git merge feature/wms/stockTransfer/20220525
```

4. 推送提测分支到远程仓库

```
(release/wms/20200530)
git push origin release/wms/20200530
```

#### 测试过程中修复 bug

1. 修复完毕，获取提测分支并做 rebase

```
(release/wms/20200530)
git pull --rebase origin release/wms/20200530
```

2. 推送到远程测试分支

```
(release/wms/20200530)
git push origin release/wms/20200530
```

#### 测试完毕

1. 获取最新的稳定版本的主分支，如：main，并切换到该分支

```
git fetch origin main
git checkout -b main origin/main
```

2. 获取测试完毕分支，如：release/wms/20200530，合并测试完毕分支到主分支，并推送到远程仓库

```
(main)
git fetch origin release/wms/20200530
git merge origin/release/wms/20200530
git push origin main
```

3. 打 tag，并推送到远程

```
(main)
git tag -a v2.1.0 -m"2022/5/30发布版本"
git push origin v2.1.0
```

#### 基于主分支的 hotfix

1. 获取最新的稳定版本的主分支，如：main，并切换到该分支

```
git fetch origin main
git checkout -b main origin/main
```

2. 新建基于 main 的 hotfix 分支，如：hotfix/20200530，并且切换到该分支

```
(main)
git checkout -b hotfix/20200530
```

3. 修复完毕，推送到远程提测分支

```
(hotfix/20200530)
git push origin hotfix/20200530
```

4. 测试完毕，基于 main 做 rebase

```
git fetch origin main
git rebase origin/main hotfix/20200530
```

5. 切到主分支，合并 hotfix 分支，并推送到远程

```
git checkout main
(main)
git pull origin main
git merge hotfix/20200530
git push origin main
```

6. 打 tag，并推送到远程

```
(main)
git tag -a v2.1.1 -m"修复XXX功能"
git push origin v2.1.1
```

#### 基于特定版本的 hotfix

1. 获取远程 tag

```
git fetch origin --tags
```

2. 基于特定版本迁出 hotfix 分支，如：hotfix/0531

```
git checkout -b hotfix/0531 v2.1.0
```

3. 修复完毕，推送到远程提测分支

```
git push origin hotfix/0531
```

4. 测试完毕，打 tag，并推送到远程

```
(hotfix/0531)
git tag -a v2.1.2 -m"修复XXX功能"
git push origin v2.1.1
```

5. 如需要将该功能提交到 main 分支

```
git checkout main
git pull origin main
git cherry-pick #commitid
git push origin main
```
