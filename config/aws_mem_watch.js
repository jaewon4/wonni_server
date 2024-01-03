require("dotenv").config({ path: "./.env.dev" });
const { AWS_SECRET_KEY, AWS_ACCESS_KEY, AWS_INSTANCE_ID, AWS_REGION } =
  process.env;

const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require("@aws-sdk/client-cloudwatch");

const client = new CloudWatchClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const params = {
  MetricDataQueries: [
    {
      Id: "memUsageQuery",
      MetricStat: {
        Metric: {
          Namespace: "CWAgent",
          MetricName: "mem_used_percent",
          Dimensions: [
            {
              Name: "InstanceId",
              Value: AWS_INSTANCE_ID,
            },
          ],
        },
        Period: 300,
        Stat: "Average",
      },
    },
  ],
  StartTime: new Date(new Date() - 3600 * 1000),
  EndTime: new Date(),
};

const getMemoryUsage = async () => {
  try {
    const data = await client.send(new GetMetricDataCommand(params));
    console.log("Memory Usage Percent:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = { getMemoryUsage };
