:arrow_forward: docker 설치후..

### 시작
docker-compose up

### 빌드부터 다시시작
docker-compose up --build

### 파일선택
docker-compose -f docker-compose.dev.yml --build
docker-compose -f docker-compose.prod.yml --build

### 종료
docker-compose down

##### used specs
- mariadb
- react
- express
- typescript
- 등등...