import Table from './Table.svelte';

export default {
  title: 'UI/Table',
  component: Table,
  argTypes: {
    stickyHeader: { control: 'boolean' },
    rowSelectionEnabled: { control: 'boolean' },
  },
};

const columns = [
  { id: 'name', label: 'table.column.name' },
  { id: 'title', label: 'table.column.title' },
  { id: 'email', label: 'table.column.email' },
  { id: 'role', label: 'table.column.role' },
];

const data = [
  { id: 1, name: 'John Doe', title: 'Software Engineer', email: 'john.doe@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', title: 'Project Manager', email: 'jane.smith@example.com', role: 'Manager' },
  { id: 3, name: 'Sam Wilson', title: 'UI/UX Designer', email: 'sam.wilson@example.com', role: 'Designer' },
  { id: 4, name: 'Alice Johnson', title: 'QA Tester', email: 'alice.johnson@example.com', role: 'Tester' },
];

const longData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    title: `Title ${i + 1}`,
    email: `person.${i + 1}@example.com`,
    role: `Role ${i + 1}`,
}));


const Template = (args) => ({
  Component: Table,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
};

export const Empty = Template.bind({});
Empty.args = {
  columns,
  data: [],
};

export const StickyHeader = Template.bind({});
StickyHeader.args = {
  columns,
  data: longData,
  stickyHeader: true,
  className: 'h-[300px]', // Add a height to demonstrate scrolling
};

export const ManyRows = Template.bind({});
ManyRows.args = {
    columns,
    data: longData,
    stickyHeader: false,
};

export const Sortable = Template.bind({});
Sortable.args = {
  columns,
  data,
  sortableColumns: ['name', 'role'],
};

export const RowSelection = Template.bind({});
RowSelection.args = {
  columns,
  data,
  rowSelectionEnabled: true,
};

export const StickyHeaderAndSortable = Template.bind({});
StickyHeaderAndSortable.args = {
  columns,
  data: longData,
  stickyHeader: true,
  sortableColumns: ['name', 'role'],
  className: 'h-64',
};
