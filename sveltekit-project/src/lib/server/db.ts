import postgres from 'postgres';

let sql: any;

if (process.env.NODE_ENV === 'test') {
  // Mock tagged template literal
  sql = (strings: TemplateStringsArray, ...values: any[]) => {
      // Mock implementation that just returns a dummy array
      return Promise.resolve([{id: '1', opt_out_status: false, temporary_rate_reduction_status: false, savings_suspension_status: false, employee_contribution_rate: 3.5, employer_contribution_rate: 3, esct_rate: 10.5, match_employer_rate: false, contributions_included: false, other_super: false}]);
  };
} else {
//  const DATABASE_URL = 'postgres://postgres:ph11Jack11n@localhost:5432/KS?sslmode=disable'; //prod
  const DATABASE_URL = 'postgres://postgres:ph11Jack11n@host.docker.internal:5432/TEA?sslmode=disable'; //dev
  sql = postgres(DATABASE_URL);
}
export { sql };
