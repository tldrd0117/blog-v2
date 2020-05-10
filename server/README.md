##### 서버 참고할 사이트
https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0

##### used framework
- express
- typescirpt
- nodemon

##### docker 명령어
- docker build -t blog-v2/node .
- docker run --name blog-v2_node_1 -p 8080:8080 -d blog-v2/node
- docker rm --force blog-v2_node_1
- docker exec -it blog-v2_node_1 /bin/bash