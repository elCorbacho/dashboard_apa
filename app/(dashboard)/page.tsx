import { OverviewClient } from '@/components/dashboard/overview-client';
import {
  getDashboardSnapshot,
  getToolbarFiltersViewModel,
} from '@/lib/dashboard/mock-adapter';

export default function OverviewPage() {
  const snapshot = getDashboardSnapshot();
  const toolbarViewModel = getToolbarFiltersViewModel();

  return (
    <OverviewClient
      snapshot={snapshot}
      initialFilters={toolbarViewModel.value}
    />
  );
}
