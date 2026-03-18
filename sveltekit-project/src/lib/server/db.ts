import postgres from 'postgres';
import { DATABASE_URL } from '/static/private';

export const sql = postgres(DATABASE_URL);
