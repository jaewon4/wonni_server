// AWS SDK 사용=============================================================================================
// require("dotenv").config({ path: "./.env.dev" });
const { AWS_SECRET_KEY, AWS_ACCESS_KEY, AWS_INSTANCE_ID, AWS_REGION } =
  process.env;

const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
} = require("@aws-sdk/client-cloudwatch");

// AWS 구성 설정
const client = new CloudWatchClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// 네트워크 입력 메트릭 가져오기 위한 파라미터 설정
const networkInParams = {
  Namespace: "AWS/EC2",
  MetricName: "NetworkIn",
  Dimensions: [
    {
      Name: "InstanceId",
      Value: AWS_INSTANCE_ID,
    },
  ],
  StartTime: new Date(new Date() - 3600 * 1000), // 1시간 전부터
  EndTime: new Date(), // 현재 시간까지
  Period: 300, // 5분 간격
  Statistics: ["Average"], // 평균 값
};

// 네트워크 출력 메트릭 가져오기 위한 파라미터 설정
const networkOutParams = {
  Namespace: "AWS/EC2",
  MetricName: "NetworkOut",
  Dimensions: [
    {
      Name: "InstanceId",
      Value: AWS_INSTANCE_ID,
    },
  ],
  StartTime: new Date(new Date() - 3600 * 1000), // 1시간 전부터
  EndTime: new Date(), // 현재 시간까지
  Period: 300, // 5분 간격
  Statistics: ["Average"], // 평균 값
};

const watchNetwork = async () => {
  try {
    const networkInData = await client.send(
      new GetMetricStatisticsCommand(networkInParams)
    );
    console.log("네트워크 입력(바이트):", networkInData);
    const networkOutData = await client.send(
      new GetMetricStatisticsCommand(networkOutParams)
    );
    console.log("네트워크 출력(바이트):", networkOutData);
  } catch (err) {
    console.error("에러 발생:", err);
  }
};

module.exports = { watchNetwork };
