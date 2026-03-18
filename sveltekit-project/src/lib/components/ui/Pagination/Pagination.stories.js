// src/lib/components/ui/pagination/Pagination.stories.js
import Pagination from './Pagination.svelte';

export default {
  title: 'UI/Pagination',
  component: Pagination,
  argTypes: {
    onPageChange: { action: 'pageChanged' }
  }
};

/*
 * Story: Displays the pagination component on the first page.
 */
export const FirstPage = {
  args: {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10
  }
};

/*
 * Story: Displays the pagination component on a middle page.
 */
export const MiddlePage = {
  args: {
    currentPage: 5,
    totalItems: 100,
    itemsPerPage: 10
  }
};

/*
 * Story: Displays the pagination component on the last page.
 */
export const LastPage = {
  args: {
    currentPage: 10,
    totalItems: 100,
    itemsPerPage: 10
  }
};

/*
 * Story: Displays the pagination component for a single page scenario.
 * In this case, the navigation controls should be hidden.
 */
export const SinglePage = {
  args: {
    currentPage: 1,
    totalItems: 5,
    itemsPerPage: 10
  }
};
