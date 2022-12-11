import { config } from 'dotenv';
import { ServiceRegistry } from './src/services/ServiceRegistry';
import firebaseApp from './src/config/firebase/admin';
import { startServer } from './src/express';

config();

const main = async () => {
  const serviceRegistry = new ServiceRegistry(firebaseApp);
  await startServer(serviceRegistry);
}

main().catch(console.error);