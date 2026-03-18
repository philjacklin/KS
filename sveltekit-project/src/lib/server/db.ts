import postgres from 'postgres';

let sql;
if (process.env.NODE_ENV === 'test') {
  sql = {
    // mock implementation
    query: async () => [{id: '1', opt_out_status: false, temporary_rate_reduction_status: false, savings_suspension_status: false, employee_contribution_rate: 3.5, employer_contribution_rate: 3, esct_rate: 10.5, match_employer_rate: false, contributions_included: false, other_super: false}],
    // ... other methods
  };
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { DATABASE_URL } from '/static/private';
  sql = postgres(DATABASE_URL);
}
export { sql };
