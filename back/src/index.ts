import { config } from 'dotenv';
import { ServiceRegistry } from './services/ServiceRegistry';
import firebaseApp from './config/firebase/admin';
import { startServer } from './express';

config();

const main = async () => {
  const serviceRegistry = new ServiceRegistry(firebaseApp);
  await startServer(serviceRegistry);
}

main().catch(console.error);