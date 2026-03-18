<script>
  import Card from './Card.svelte';
  import { t } from '$lib/stores/localeStore';

  const employee1 = { name: 'John Doe', salary: '$5000' };
  const employee2 = { name: 'Jane Smith', salary: '$6000' };
</script>

<Card data-testid="outer-card">
  <Card data-testid="inner-card-1">
    <p>{$t('payroll.employee_label')}: {employee1.name}</p>
    <p>{$t('payroll.salary_label')}: {employee1.salary}</p>
  </Card>
  <Card data-testid="inner-card-2">
    <p>{$t('payroll.employee_label')}: {employee2.name}</p>
    <p>{$t('payroll.salary_label')}: {employee2.salary}</p>
  </Card>
</Card>
