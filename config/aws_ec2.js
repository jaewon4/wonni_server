// require("dotenv").config({ path: "./.env.dev" });
const { AWS_SECRET_KEY, AWS_ACCESS_KEY, AWS_REGION } = process.env;

const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

const ec2Client = new EC2Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const getInstanceDetails = async () => {
  try {
    const data = await ec2Client.send(new DescribeInstancesCommand({}));
    for (const reservation of data.Reservations) {
      for (const instance of reservation.Instances) {
        const nameTag = instance.Tags.find((tag) => tag.Key === "Name");
        const instanceName = nameTag ? nameTag.Value : "Unnamed instance";
        console.log(`Instance Name: ${instanceName}`);
        console.log(`Launch Time: ${instance.LaunchTime}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getInstanceDetails };
