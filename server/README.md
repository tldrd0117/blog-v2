##### 서버 참고할 사이트
- 견고한 node.js 프로젝트 설계하기: https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0

- Https : https://webactually.com/2018/11/http%EC%97%90%EC%84%9C-https%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C/

- argon2 : https://argon2.online/, https://github.com/ranisalt/node-argon2
- dotenv : https://www.npmjs.com/package/dotenv
- jwt: https://jwt.io/



##### used framework
- express
- typescirpt
- nodemon

##### docker 명령어
- docker build -t blog-v2/node .
- docker run --name blog-v2_node_1 -p 8080:8080 -d blog-v2/node
- docker rm --force blog-v2_node_1
- docker exec -it blog-v2_node_1 /bin/bash


- docker run --name blog-v2_db_1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=qwer1234 -d mariadb
