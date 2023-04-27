---
layout: post
title: 'docker-nginx-koa'
date: 2023-02-21 13:21:00 +0800
categories: jekyll update
---

### 运行nginx

```sh
docker run --name nginx --network host -v /root/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/conf/log:/var/log/nginx -v /root/conf/conf.d/default.conf:/etc/nginx/conf.d/default.conf -d nginx
```

### 运行discrete-components-web

```sh
docker run --rm --name discrete-components-web --network host -d docker.nb.bluetron.cn/bluetron/supdiscr/discrete-components-web:latest

```

### 运行front-end-middleware

```sh
docker run --rm --name front-end-middleware --network host -d docker.nb.bluetron.cn/bluetron/supdiscr/front-end-middleware:latest
```

### 重启nginx

```sh
docker exec c40bd nginx -s reload
```
