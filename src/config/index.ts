export enum LogTransport {
  CONSOLE = 'CONSOLE',
  LOGSTASH = 'LOGSTASH',
}

export const CONFIG_PATHS = {
  encryption: {
    validationPasswordEncryptionKey:
      'encryption.validationPasswordEncryptionKey',
  },
};

export interface Configuration {
  env: {
    value: string;
    mode: string;
    isDev: boolean;
    isTest: boolean;
  };
  port: number;
  cronMode: boolean;
  database: {
    url: string;
  };
  rabbitMq: {
    url: string;
    username: string;
    password: string;
    vhost: string;
    globalVhost: string;
    routingKeyPrefix: string;
  };
  log: {
    logLevel: string;
    logTransport: string;
    logstashHost: string;
    logstashPort: number;
  };
  email: {
    defaultSender: string;
    defaultSenderName: string;
    defaultCCAddress: string;
  };
  encryption: {
    validationPasswordEncryptionKey: string;
  };
  aws: {
    region: string;
  };
  fusionauth: {
    apiKey: string;
    host: string;
    sourceTenantId: string;
    sourceAppId: string;
  };
  messagingUrl: string;
  passwordResetConfig: {
    expireIn: string;
    secret: string;
  };
  grpc: {
    url: string;
  };
  observability: {
    exporterUrl: string;
    enabled: boolean;
  };
}

const { NODE_ENV, SERVER_MODE } = process.env;

const DEVELOPMENT_ENVS = ['dev', 'development', 'local'];
const TEST_ENVS = ['jest', 'e2e', 'test'];

export default (): Configuration => ({
  env: {
    value: NODE_ENV,
    isDev: DEVELOPMENT_ENVS.includes(NODE_ENV),
    isTest: TEST_ENVS.includes(NODE_ENV),
    mode: SERVER_MODE,
  },
  port: parseInt(process.env.PORT, 10) || 8080,
  cronMode: SERVER_MODE === 'CRON',
  database: {
    url: `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
  },
  rabbitMq: {
    url: process.env.AMQP_URL,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
    globalVhost: process.env.AMQP_GLOBAL_VHOST,
    vhost: process.env.AMQP_VHOST,
    routingKeyPrefix: process.env.AMQP_ROUTING_KEY_PREFIX,
  },
  log: {
    logLevel: process.env.LOG_LEVEL,
    logTransport: process.env.LOG_TRANSPORT,
    logstashHost: process.env.LOGSTASH_HOST,
    logstashPort: parseInt(process.env.LOGSTASH_PORT, 10),
  },
  email: {
    defaultSender: process.env.EMAIL_SENDER,
    defaultSenderName: process.env.EMAIL_SENDER_NAME,
    defaultCCAddress: process.env.CC_ADDRESS,
  },
  encryption: {
    validationPasswordEncryptionKey:
      process.env.VERIFICATION_PASSWORD_ENCRYPTION_KEY,
  },
  aws: {
    region: process.env.AWS_REGION,
  },
  fusionauth: {
    apiKey: process.env.FUSIONAUTH_API_KEY,
    host: process.env.FUSIONAUTH_HOST,
    sourceTenantId: process.env.FUSIONAUTH_SOURCE_TENANT_ID,
    sourceAppId: process.env.FUSIONAUTH_SOURCE_APP_ID,
  },
  messagingUrl: process.env.MESSAGE_SERVICE_URL,
  passwordResetConfig: {
    expireIn: process.env.PASSWORD_RESET_EXPIRE_IN,
    secret: process.env.PASSWORD_RESET_JWT_SECRET,
  },
  grpc: {
    url: process.env.GRPC_ENDPOINT,
  },
  observability: {
    exporterUrl: process.env.OTEL_EXPORTER_URL,
    enabled: process.env.ENABLE_OBSERVABILITY == 'true',
  },
});
