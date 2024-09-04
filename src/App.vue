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
    >
      <Column
        sortable
        field="id"
        header="ID"
        style="width: 10%"
        :headerStyle="{ backgroundColor: '#3B793D', color: '#ffffff' }"
      ></Column>
      <Column
        sortable
        field="name"
        header="Name"
        style="width: 30%"
        :headerStyle="{ backgroundColor: '#3B793D', color: '#ffffff' }"
      ></Column>
      <Column
        :headerStyle="{ backgroundColor: '#3B793D', color: '#ffffff' }"
        sortable
        field="sov_trips_count"
        header="SOV Trips Count"
        style="width: 20%"
      ></Column>
      <Column
        :headerStyle="{ backgroundColor: '#3B793D', color: '#ffffff' }"
        sortable
        field="points"
        header="Points"
        style="width: 20%"
      ></Column>
      <Column
        :headerStyle="{ backgroundColor: '#3B793D', color: '#ffffff' }"
        sortable
        field="money"
        header="Money"
        style="width: 20%"
      ></Column>
     
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

        const dummydata = {
          items: [
            {
              id: 1,
              name: "Item 1",
              sov_trips_count: 42,
              points: 10,
              money:5
            },
            {
              id: 2,
              name: "Item 2",
              sov_trips_count: 65,
              points: 20,
              money:10

            },
            {
              id: 3,
              name: "Item 3",
              sov_trips_count: 23,
              points: 30,
              money:15

            },
            {
              id: 4,
              name: "Item 4",
              sov_trips_count: 71,
              points: 40,
              money:20

            },
            {
              id: 5,
              name: "Item 5",
              sov_trips_count: 54,
              points: 50,
              money:25

            },
            {
              id: 6,
              name: "Item 6",
              sov_trips_count: 12,
              points: 60,
              money:30

            },
            {
              id: 7,
              name: "Item 7",
              sov_trips_count: 38,
              points: 70,
              money:35

            },
            {
              id: 8,
              name: "Item 8",
              sov_trips_count: 61,
              points: 80,
              money:40

            },
            {
              id: 9,
              name: "Item 9",
              sov_trips_count: 27,
              points: 90,
              money:45

            },
            {
              id: 10,
              name: "Item 10",
              sov_trips_count: 49,
              points: 100,
              money:50

            },
          ],
        };
        items.value = dummydata.items;
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
