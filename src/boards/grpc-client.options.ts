// import { ClientOptions, Transport } from '@nestjs/microservices';
// import { join } from 'path';

// export const grpcClientOptions: ClientOptions = {
//   transport: Transport.GRPC,
//   options: {
//     url: 'localhost:9091',  // gRPC 서버의 주소와 포트
//     package: 'net.devh.boot.grpc.examples.lib', // 프로토콜 버퍼 파일에서 정의한 패키지 이름
//     protoPath: join(__dirname, '../proto/helloworld.proto'), // .proto 파일의 경로
//   },
// };