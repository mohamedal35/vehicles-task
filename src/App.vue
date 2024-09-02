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
          :highlightOnSelect="true"
          class="w-full md:w-56"
          @change="onPeriodChange" 
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
        :lazy="true"
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
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const items = ref([]);
      const loading = ref(true);
      const rowsPerPage = ref(5);
      const first = ref(0); 
      const total = ref(0);
      const periods = ref([
        { name: "All", code: 0 },
        { name: "1 Month", code: 1 },
        { name: "3 Months", code: 3 },
        { name: "6 Months", code: 6 },
        { name: "1 year", code: 12 },
      ]);
      const selectedPeriod = ref(periods.value[0]); // Default to first option
  
      onMounted(() => {
        fetchData();
      });
  
      const fetchData = async () => {
        loading.value = true;
        try {
          const page = first.value / rowsPerPage.value + 1; // Calculate the current page
          const response = await fetch(
            `http://localhost:8000/?rows=${rowsPerPage.value}&page=${page}&period=${selectedPeriod.value.code}`
          );
          const data = await response.json();
          items.value = data.data; 
          total.value = data.total;
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
  
      const onPeriodChange = (e) => {
        first.value = 0; // Reset the first index to 0 when the period changes
        fetchData();
      };
  
      return {
        items,
        loading,
        rowsPerPage,
        first,
        total,
        selectedPeriod,
        periods,
        fetchData,
        onPageChange,
        onPeriodChange,
      };
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here if needed */
  </style>
  