<template>
  <ThemeSwitcher />
  <div class="card">
    <!-- Dropdown for selecting the period -->
    <div class="p-field d-flex justify-content-center">
      <Select
        v-model="selectedPeriod"
        :options="periods"
        optionLabel="name"
        placeholder="Select a Period"
        checkmark
        :highlightOnSelect="false"
        class="w-full md:w-56"
      />
    </div>
    <!-- DataTable component -->
    <DataTable
      :value="items"
      paginator
      :rows="rowsPerPage"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      :loading="loading"
      @page="onPageChange"
      :totalRecords="total" 
    >
      <Column sortable field="id" header="ID" style="width: 10%"></Column>
      <Column sortable field="name" header="Name" style="width: 30%"></Column>
      <Column
        sortable
        field="sov_trips_count"
        header="SOV Trips Count"
        style="width: 20%"
      ></Column>
      <Column sortable header="Points" style="width: 20%">
        <template #body="slotProps">
          {{ slotProps.data.sov_trips_count * 55 }}
        </template>
      </Column>
      <Column sortable header="Money" style="width: 20%">
        <template #body="slotProps">
          {{ (slotProps.data.sov_trips_count * 0.8).toLocaleString() }}$
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

const selectedPeriod = ref();
const periods = ref([
  { name: "1 Month", code: 1 },
  { name: "3 Months", code: 3 },
  { name: "6 Months", code: 6 },
  { name: "1 year", code: 12 },
]);

export default {
  setup() {
    const items = ref([]);
    const loading = ref(true);
    const rowsPerPage = ref(5); // Default rows per page
    const first = ref(0); // Default first row index
    const selectedPeriod = ref("quarterly"); // Default period
    const total = ref(1);
    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      loading.value = true;
      try {
        // Include the selected period in the query parameters
        const response = await fetch(
          `http://localhost:8000/?rows=${rowsPerPage.value}&first=${first.value}&period=${selectedPeriod.value}`
        ); // Update with actual API endpoint
        const data = await response.json();
        items.value = data?.data; // Directly use the data since the response is an array
        total.value = data?.total;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.value = false;
      }
    };

    const onPageChange = (event) => {
      rowsPerPage.value = event.rows;
      first.value = event.first;
      fetchData();
    };

    const onPeriodChange = () => {
      fetchData();
    };

    return {
      items,
      loading,
      rowsPerPage,
      first,
      selectedPeriod,
      fetchData,
      onPageChange,
      onPeriodChange,
      periods,
      selectedPeriod,
      total,
    };
  },
};
</script>

<style>
/* Add some basic styling for the dropdown */
.p-field {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.p-label {
  margin-right: 0.5rem;
}

.p-inputtext {
  min-width: 150px;
}
</style>
