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

// 메트릭 통계 가져오기 위한 파라미터 설정
const params = {
  Namespace: "AWS/EC2",
  MetricName: "CPUUtilization",
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

const watchCPU = async () => {
  try {
    const data = await client.send(new GetMetricStatisticsCommand(params));
    console.log("CPU 사용률:", data);
  } catch (err) {
    console.error("에러 발생:", err);
  }
};

module.exports = { watchCPU };
