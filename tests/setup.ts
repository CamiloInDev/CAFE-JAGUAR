import { beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const TEST_DB_PATH = path.join(process.cwd(), 'db.test.json');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_key_at_least_32_chars_long_12345';
process.env.WOMPI_INTEGRITY_KEY = 'test_wompi_integrity_key_for_testing';
process.env.VITE_WOMPI_PUBLIC_KEY = 'pub_test_wompi_public_key_for_testing';
process.env.PORT = '0';
process.env.APP_URL = 'http://localhost:3000';

beforeAll(() => {
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }
});

afterAll(() => {
  if (fs.existsSync(TEST_DB_PATH)) {
    try {
      fs.unlinkSync(TEST_DB_PATH);
    } catch {
    }
  }
});
